import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PackageEvents } from './events/events.enum';

@Injectable()
export class NotificationsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  sendNotification(payload: any) {
    this.eventEmitter.emit(PackageEvents.packageUpdatedTrack, payload);
  }
}
