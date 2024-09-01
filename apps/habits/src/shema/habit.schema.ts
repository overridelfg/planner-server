import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ collection: 'Habit' })
export class Habit extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  order: number;

  @Prop()
  userId: string;

  @Prop()
  color: string;

  @Prop()
  duration: number;
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
