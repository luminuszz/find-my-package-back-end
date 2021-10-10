import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePackageDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  code: string;
}
