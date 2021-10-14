import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
class AppTokenInput {
  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  data: string;
}

@InputType()
export class CreateSessionDTO {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field(() => AppTokenInput)
  @IsOptional()
  appToken: AppTokenInput;
}
