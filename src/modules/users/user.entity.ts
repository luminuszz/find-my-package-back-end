import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, GraphQLISODateTime, ID } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

import { Package } from '../packages/package.entity';

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }] })
  @Field(() => [Package])
  packages: Package[];
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserSchema };
