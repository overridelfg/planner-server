import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ collection: 'Task' })
export class Task extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  createdAt: string;

  @Prop()
  priority: string;

  @Prop()
  userId: string;

  @Prop()
  isCompleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
