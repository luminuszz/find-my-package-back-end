import { Field, InputType } from '@nestjs/graphql';

import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
