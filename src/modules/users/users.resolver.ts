import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Public } from '../auth/decorators/isPublic.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Mutation(() => User)
  async createUser(@Args('createUser') createUser: CreateUserDTO) {
    return this.usersService.create({
      ...createUser,
    });
  }

  @Query(() => [User])
  async getAllUsers(@CurrentUser() user: User): Promise<User[]> {
    const users = await this.usersService.getAllUsers();

    return users;
  }

  @Query(() => User)
  async me(@CurrentUser() user: User): Promise<User> {
    const response = await this.usersService.findUserById(user._id);

    console.log({ response });

    return response;
  }
}
