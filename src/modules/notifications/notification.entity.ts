import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  id: false,
})
class Notification extends mongoose.Document {
  __id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop()
  origin: string;

  @Prop()
  isSend: boolean;

  @Prop()
  identify: string;

  @Prop()
  to: string;

  createdAt: Date;

  updatedAt: Date;
}

const NotificationSchema = SchemaFactory.createForClass(Notification);

export { Notification, NotificationSchema };
