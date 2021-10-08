import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { HashService } from '../../shared/providers/hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUser: CreateUserDTO): Promise<User> {
    console.log({ model: this.usersModel });

    const verifyUserExists = await this.usersModel
      .findOne({
        email: createUser.email,
      })
      .exec();

    if (verifyUserExists) throw new BadRequestException('user already exists');

    return await this.usersModel.create({
      ...createUser,
      password: await this.hashService.hash(createUser.password),
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersModel.find();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.usersModel.findOne({ email }).exec();
  }

  async findUserById(id: string): Promise<User> {
    return this.usersModel.findById(id).exec();
  }
}
