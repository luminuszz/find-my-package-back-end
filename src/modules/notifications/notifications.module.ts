import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { PackageAppListener } from './listeners/package-app.listener';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema, Notification } from './notification.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationsService, PackageAppListener],
  exports: [NotificationsService],
})
export class NotificationsModule {}
