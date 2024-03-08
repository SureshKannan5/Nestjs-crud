import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TASK_MODEL } from 'src/utils/constants';
import { CreateTaskDto } from './dto/createTasks.dto';
import { Model } from 'mongoose';
import { FilteredTasks, Tasks } from './interfaces/task.interfaces';
import { UpdateTasksDto } from './dto/updateTasks.dto';
import { ListTasksDto } from './dto/listTasks.dto';

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

  // delete user by id

  async deleteTaskById(id: string) {
    try {
      if (this.checkDatabaseConnection()) {
        const task = await this.userModal.deleteOne({ _id: id });
        if (task.deletedCount === 0) {
          throw new NotFoundException('Task not found');
        }
        console.log('task', task);
        return { message: 'Task deleted sucessfully' };
      }
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }

  // tasks server pagination service function

  async listAllTasksByFilter(
    page: number = 1,
    limit: number = 10,
    filter: ListTasksDto,
  ): Promise<FilteredTasks> {
    try {
      const { status, sortKey } = filter;
      if (this.checkDatabaseConnection()) {
        // skip the records for paginated results
        const skip = (page - 1) * limit;

        const sortType = sortKey === 'ASC' ? 1 : -1;

        let query = this.userModal.find();

        if (status !== 'ALL') {
          query = query.where('status').equals(status);
        }

        // Execute the query to get the total count of items
        const totalItemCount = await this.userModal.countDocuments(
          query.getFilter(),
        );
        console.log('totalItemCount', totalItemCount);

        const items = await query
          .sort({ updatedAt: sortType })
          .skip(skip)
          .limit(limit)
          .exec();

        return { data: items, totalTasks: totalItemCount };
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async checkDatabaseConnection(): Promise<boolean> {
    // check DB whether it connected or not.
    const isConnected = this.userModal.db.readyState === 1;

    return isConnected;
  }
}
