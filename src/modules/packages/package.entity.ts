import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

import { User } from '../users/user.entity';

@ObjectType()
@Schema({
  timestamps: true,
  id: false,
})
class Package extends mongoose.Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  code: string;

  @Field()
  @Prop({ required: true })
  departureData: string;

  @Field()
  @Prop({ required: true })
  eventDate: string;

  @Field()
  @Prop({ required: true })
  eventHour: string;

  @Field()
  @Prop({ required: true })
  status: string;

  @Prop()
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Prop()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  owner: User;
}

const PackageSchema = SchemaFactory.createForClass(Package);

export { Package, PackageSchema };
