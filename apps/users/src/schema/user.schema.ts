import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
@Schema({ collection: 'User' })
export class User extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
