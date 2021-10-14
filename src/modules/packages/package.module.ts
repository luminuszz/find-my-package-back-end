import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PackageService } from './package.service';
import { PackageResolver } from './package.resolver';
import { PackageSchema, Package } from './package.entity';
import { UsersModule } from '../users/users.module';
import { DeliveryModule } from './providers/delivery/delivery.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { BullModule } from '@nestjs/bull';
import { PackageQueue } from './enums/queues.enum';
import { jobs } from './jobs';
import { PackageTasks } from './tasks/package.tasks';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Package.name,
        schema: PackageSchema,
      },
    ]),
    BullModule.registerQueue({
      name: PackageQueue.updatePackAgeStatus,
    }),
    UsersModule,
    DeliveryModule,
    NotificationsModule,
  ],
  providers: [PackageService, PackageResolver, ...jobs, PackageTasks],
})
export class PackageModule {}
