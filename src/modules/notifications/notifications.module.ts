import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { PackageAppListener } from './listeners/package-app.listener';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema, Notification } from './notification.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),

    HttpModule.register({
      baseURL: 'https://exp.host/--/api/v2/push/send',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
    }),
  ],
  providers: [NotificationsService, PackageAppListener],
  exports: [NotificationsService],
})
export class NotificationsModule {}
