import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserDTO } from './create-user.dto';

@InputType()
export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @Field()
  userId: string;
}
