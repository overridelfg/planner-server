import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Habit } from './shema/habit.schema';

@Injectable()
export class HabitRepository extends AbstractRepository<Habit> {
  protected readonly logger = new Logger(Habit.name);

  constructor(
    @InjectModel(Habit.name) habitModel: Model<Habit>,
    @InjectConnection() connection: Connection,
  ) {
    super(habitModel, connection);
  }
}
