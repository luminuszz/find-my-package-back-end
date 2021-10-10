import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../events/events.enum';
import { Injectable } from '@nestjs/common';
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

  @OnEvent(Events.packageUpdatedTrack)
  async packageCreated(message: MessageRequest) {
    const messageRequest: ExpoMessageRequest = {
      body: message.description,
      sound: 'default',
      data: {},
      title: message.title,
      to: '',
    };

    this.httpService
      .post('', messageRequest)
      .subscribe(async (event) => {
        await this.notificationService.updateNotification(message._id, {
          isSend: !(event instanceof Error),
        });
      })
      .unsubscribe();
  }
}
