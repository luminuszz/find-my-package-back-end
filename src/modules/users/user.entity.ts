import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Field, ObjectType, GraphQLISODateTime, ID } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

import { Package } from '../packages/package.entity';

@ObjectType()
export class AppToken {
  @Field()
  type: string;

  @Field()
  data: string;
}

@Schema({
  timestamps: true,
  id: false,
})
@ObjectType()
class User extends mongoose.Document {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field({ nullable: false })
  name: string;

  @Prop({ required: true })
  @Field({ nullable: false })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Prop()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Prop(
    raw({
      type: { type: String },
      data: { type: String },
    }),
  )
  @Field(() => AppToken)
  appToken?: AppToken;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }] })
  @Field(() => [Package])
  packages: Package[];
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };
