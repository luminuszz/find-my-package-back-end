import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesResolver } from './deliveries.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PackageSchema, Package } from './package.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Package.name, schema: PackageSchema }]),
  ],
  providers: [DeliveriesService, DeliveriesResolver],
})
export class DeliveriesModule {}
