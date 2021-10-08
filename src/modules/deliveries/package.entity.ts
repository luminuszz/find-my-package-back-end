import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

import { User } from '../users/user.entity';

@ObjectType()
@Schema({
  timestamps: true,
})
class Package extends mongoose.Document {
  @Field(() => ID)
  @Prop({ required: true })
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  code: string;

  @Field()
  @Prop({ required: true })
  departureData: Date;

  @Field()
  @Prop({ required: true })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

const PackageSchema = SchemaFactory.createForClass(Package);

export { Package, PackageSchema };
