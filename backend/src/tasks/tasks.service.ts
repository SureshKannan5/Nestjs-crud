import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TASK_MODEL } from 'src/utils/constants';
import { CreateTaskDto } from './dto/createTasks.dto';
import { Model } from 'mongoose';
import { Tasks } from './interfaces/task.interfaces';
import { UpdateTasksDto } from './dto/updateTasks.dto';

@Injectable()
export class TasksService {
  constructor(@Inject(TASK_MODEL) private userModal: Model<Tasks>) {}

  // create task
  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    try {
      // check db connection
      if (this.checkDatabaseConnection()) {
        console.log('DB is connected Sucessfully');
        // save the take dto to db
        const taskInstance = new this.userModal(createTaskDto);
        return await taskInstance.save();
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // list all tasks with pagination

  async listAllTasks(page: number = 1, limit: number = 10): Promise<Tasks[]> {
    try {
      if (this.checkDatabaseConnection()) {
        // skip the records for paginated results
        const skip = (page - 1) * limit;

        return this.userModal.find().skip(skip).limit(limit).exec();
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // get task by ID

  async getTaskById(id: string): Promise<Tasks> {
    try {
      if (this.checkDatabaseConnection()) {
        const task = await this.userModal.findById(id);
        if (!task) {
          throw new NotFoundException('Task not found');
        }
        return task;
      }
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }

  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTasksDto,
  ): Promise<Tasks> {
    try {
      if (this.checkDatabaseConnection()) {
        const existingTask = await this.userModal.findById(id);
        // check whether task existing or not
        if (!existingTask) {
          throw new NotFoundException('Task not found');
        }
        // update the field from client
        Object.assign(existingTask, updateTaskDto);

        return await existingTask.save();
      }
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }

  async deleteTaskById(id: string) {
    try {
      if (this.checkDatabaseConnection()) {
        const task = await this.userModal.deleteOne({ _id: id });
        if (!task) {
          throw new NotFoundException('Task not found');
        }
        console.log('task', task);
        return { message: 'Task deleted sucessfully' };
      }
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }

  async checkDatabaseConnection(): Promise<boolean> {
    // check DB whether it connected or not.
    const isConnected = this.userModal.db.readyState === 1;

    return isConnected;
  }
}
