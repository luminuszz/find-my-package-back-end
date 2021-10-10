import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Package } from './package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '../users/user.entity';
import { PackageService } from './package.service';

@Resolver(() => Package)
export class PackageResolver {
  constructor(private readonly packageService: PackageService) {}

  @Mutation(() => Package)
  async createPackage(
    @Args('createPackage') createPackage: CreatePackageDto,
    @CurrentUser() owner: User,
  ) {
    return this.packageService.create(createPackage, owner._id);
  }

  @Query(() => [Package])
  async getAllPackages() {
    return this.packageService.getAllPackages();
  }
}
