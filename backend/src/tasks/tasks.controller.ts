import { Body, Controller, Post } from '@nestjs/common';
import { BASE_URL } from 'src/utils/constants';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTasks.dto';

@Controller(`${BASE_URL}/task`)
export class TasksController {
  constructor(private taskServices: TasksService) {}

  @Post()
  async createTasks(@Body() createTaskDto: CreateTaskDto) {
    return this.taskServices.createTask(createTaskDto);
  }
}
