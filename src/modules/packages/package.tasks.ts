import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { PackageQueue } from './enums/queues.enum';
import { Queue } from 'bull';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PackageService } from './package.service';

@Injectable()
export class PackageTasks {
  constructor(
    @InjectQueue(PackageQueue.updatePackAgeStatus)
    private readonly updateStatusQueue: Queue,
    private readonly packageService: PackageService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async schedulePackAgeStatus() {
    const packages = await this.packageService.getAllPackages();

    if (packages.length) {
      packages.forEach((pg) => {
        this.updateStatusQueue.add(pg);
      });
    }
  }
}
