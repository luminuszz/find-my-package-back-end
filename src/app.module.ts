import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';
import {
  bullModuleConfig,
  configModule,
  configMongooseModule,
  graphQLModuleConfig,
} from './config/modules.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { PackageModule } from './modules/packages/package.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt.guard';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    MongooseModule.forRootAsync(configMongooseModule),
    GraphQLModule.forRootAsync(graphQLModuleConfig),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRootAsync(bullModuleConfig),
    UsersModule,
    PackageModule,
    AuthModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
