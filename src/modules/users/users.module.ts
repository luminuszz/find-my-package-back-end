import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HashModule } from '../../shared/providers/hash/hash.module';
import { User, UserSchema } from './user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HashModule,
  ],
  providers: [UsersService, UsersResolver],

  exports: [UsersService],
})
export class UsersModule {}
