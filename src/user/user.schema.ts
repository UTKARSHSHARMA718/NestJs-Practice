import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true, index: true })
  email: string;
  @Prop({ required: true, min: 8, max: 16 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
