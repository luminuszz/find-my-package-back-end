import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Package } from './package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UsersService } from '../users/users.service';
import { DeliveryServiceProvider } from './providers/delivery/core/delevery-service.provider';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package.name)
    private readonly packageModel: Model<Package>,
    private readonly usersService: UsersService,
    private readonly deliveryService: DeliveryServiceProvider,
  ) {}

  async create(
    createPackage: CreatePackageDto,
    ownerId: string,
  ): Promise<Package> {
    console.log(ownerId);
    const owner = await this.usersService.findUserById(ownerId);

    if (!owner) throw new BadRequestException('owner not found');

    const verifyThisPackageAlreadyExistsInUser = owner.packages.find(
      (pg) => pg.code === createPackage.code,
    );

    if (verifyThisPackageAlreadyExistsInUser)
      throw new BadRequestException('This package already exists');

    const packageDetails = await this.deliveryService.findPackage(
      createPackage.code,
    );

    const newPackage = await this.packageModel.create({
      ...packageDetails,
      owner: owner._id,
      eventDate: packageDetails.eventDate,
      eventHour: packageDetails.hour,
    });

    await this.usersService.updateUser(owner._id, {
      packages: [...owner.packages, newPackage],
    });

    return newPackage;
  }

  async getAllPackages(): Promise<Package[]> {
    return this.packageModel.find().populate('owner').exec();
  }

  async updatePackageByCode(
    packageCode: string,
    packageData: Partial<Package>,
  ) {
    return this.packageModel.findOneAndUpdate(
      { code: packageCode },
      { ...packageData },
    );
  }
}
