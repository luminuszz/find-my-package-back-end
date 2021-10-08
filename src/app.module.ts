import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';
import {
  configModule,
  configMongooseModule,
  graphQLModuleConfig,
} from './config/modules.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { DeliveriesModule } from './modules/deliveries/deliveries.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    MongooseModule.forRootAsync(configMongooseModule),
    GraphQLModule.forRootAsync(graphQLModuleConfig),
    UsersModule,
    DeliveriesModule,
    AuthModule,
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
