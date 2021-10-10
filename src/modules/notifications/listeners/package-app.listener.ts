import { OnEvent } from '@nestjs/event-emitter';
import { PackageEvents } from '../events/events.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PackageAppListener {
  @OnEvent(PackageEvents.packAgeCreated)
  async packageCreated(message: string) {
    console.log({ message });
  }
}
