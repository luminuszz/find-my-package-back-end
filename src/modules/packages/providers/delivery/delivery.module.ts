import { Module } from '@nestjs/common';
import { DeliveryServiceFactory } from './delivery-service.factory';

@Module({
  imports: [],
  providers: [DeliveryServiceFactory],

  exports: [DeliveryServiceFactory],
})
export class DeliveryModule {}
