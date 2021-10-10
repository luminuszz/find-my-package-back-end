import { Provider } from '@nestjs/common';
import { CorreioService } from './implement/correios.service';
import { DeliveryServiceProvider } from './core/delevery-service.provider';

export const DeliveryServiceFactory: Provider = {
  provide: DeliveryServiceProvider,
  useClass: CorreioService,
};
