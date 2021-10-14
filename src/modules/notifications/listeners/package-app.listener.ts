import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../events/events.enum';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Notification } from '../notification.entity';
import { NotificationsService } from '../notifications.service';

type MessageRequest = Notification;

type ExpoMessageRequest = {
  to: string;
  sound: string;
  title: string;
  body: string;
  data: any;
};

@Injectable()
export class PackageAppListener {
  constructor(
    private readonly httpService: HttpService,
    private readonly notificationService: NotificationsService,
  ) {}

  private logger = new Logger(PackageAppListener.name);

  @OnEvent(Events.packageUpdatedTrack)
  async packageCreated(message: MessageRequest) {
    console.log('teste', message.to);

    const messageRequest: ExpoMessageRequest = {
      body: message.description,
      sound: 'default',
      data: {},
      title: message.title,
      to: message.to,
    };

    this.logger.debug('send notification', messageRequest);

    this.httpService.post('', messageRequest).subscribe(async (event) => {
      await this.notificationService.updateNotification(message._id, {
        isSend: !(event instanceof Error),
      });
      this.logger.debug('bateu aqui', event.data);
    });
  }
}
