import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Task } from './schema/Task.schema';

@Injectable()
export class TasksRepository extends AbstractRepository<Task> {
  protected readonly logger = new Logger(Task.name);

  constructor(
    @InjectModel(Task.name) taskModel: Model<Task>,
    @InjectConnection() connection: Connection,
  ) {
    super(taskModel, connection);
  }
}
