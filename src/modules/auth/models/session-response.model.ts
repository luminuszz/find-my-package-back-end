import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SessionLoginResponse {
  @Field()
  token: string;
}
