import {
  OnQueueCompleted,
  OnQueueError,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';

import { PackageQueue } from '../enums/queues.enum';
import { Injectable, Logger } from '@nestjs/common';
import { DeliveryServiceProvider } from '../providers/delivery/core/delevery-service.provider';
import { PackageService } from '../package.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { Package } from '../package.entity';
import { Events } from '../../notifications/events/events.enum';

type Payload = Package;

@Injectable()
@Processor(PackageQueue.updatePackAgeStatus)
export class UpdatePackageStatusJob {
  constructor(
    private readonly deliveryService: DeliveryServiceProvider,
    private readonly notificationService: NotificationsService,
    private readonly packageService: PackageService,
  ) {}

  private logger = new Logger(UpdatePackageStatusJob.name);

  @Process()
  async process({ data }: Job<Payload>) {
    const response = await this.deliveryService.findPackage(data.code);

    const isStatusChanged =
      response.status !== data.status ||
      response.eventDate !== data.eventDate ||
      response.hour !== data.eventHour;

    if (isStatusChanged) {
      await this.packageService.updatePackageByCode(data.code, {
        status: response.status,
        eventDate: response.eventDate,
        eventHour: response.hour,
      });

      const { status, code, owner } = data;

      this.logger.debug('enviando notifição');

      this.notificationService.createNotification(
        {
          description: status,
          title: `O pacote ${code} mudou o status`,
          identify: owner._id,
          to: owner.appToken.data,
        },
        Events.packageUpdatedTrack,
      );
    }
  }

  @OnQueueProgress()
  async logJob() {
    this.logger.debug('progress');
  }

  @OnQueueCompleted()
  async triggerNotification(job: Job<Payload>) {
    if (job.data) {
    }
  }

  @OnQueueError()
  async reesendQueue(job: Job<Payload>) {
    const errorCount = await job.queue.getFailedCount();

    if (errorCount !== 3) {
      this.process(job);

      return;
    }

    this.logger.error(job.data);
  }
}
