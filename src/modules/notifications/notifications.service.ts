import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from './events/events.enum';
import { Model } from 'mongoose';
import { Notification } from './notification.entity';
import { InjectModel } from '@nestjs/mongoose';

type NotificationPayload = {
  title: string;
  description?: string;
};

@Injectable()
export class NotificationsService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @InjectModel(Notification.name)
    private readonly notificationsModel: Model<Notification>,
  ) {}

  createNotification(payload: NotificationPayload, event: Events) {
    this.notificationsModel
      .create({
        title: payload.title,
        description: payload.description || null,
        origin: event,
      })
      .then((newNotification) => {
        this.eventEmitter.emit(event, newNotification);
      });
  }

  async updateNotification(
    notificationId: string,
    notification: Partial<Notification>,
  ) {
    return this.notificationsModel.findByIdAndUpdate(notificationId, {
      ...notification,
    });
  }
}
