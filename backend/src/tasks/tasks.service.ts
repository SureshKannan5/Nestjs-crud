import { Inject, Injectable } from '@nestjs/common';
import { TASK_MODEL } from 'src/utils/constants';
import { CreateTaskDto } from './dto/createTasks.dto';
import { Model } from 'mongoose';
import { Tasks } from './interfaces/task.interfaces';

@Injectable()
export class TasksService {
  constructor(@Inject(TASK_MODEL) private userModal: Model<Tasks>) {}

  async createTask(createTaskDto: CreateTaskDto) {
    console.log('coming into task', createTaskDto);

    if (this.checkDatabaseConnection()) {
      console.log('DB is connected Sucessfully');
    }
  }

  async checkDatabaseConnection(): Promise<boolean> {
    const isConnected = this.userModal.db.readyState === 1; // 1 means connected

    return isConnected;
  }
}
