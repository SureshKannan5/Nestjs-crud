import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  BadRequestException,
  Put,
  Delete,
} from '@nestjs/common';
import { BASE_URL } from 'src/utils/constants';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTasks.dto';
import { UpdateTasksDto } from './dto/updateTasks.dto';
import { ListTasksDto } from './dto/listTasks.dto';

@Controller(`${BASE_URL}/task`)
export class TasksController {
  constructor(private taskServices: TasksService) {}

  @Post()
  async createTasks(@Body() createTaskDto: CreateTaskDto) {
    try {
      return this.taskServices.createTask(createTaskDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Get()
  async listAllTasks() {
    try {
      return this.taskServices.listAllTasks();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    try {
      return this.taskServices.getTaskById(id);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }
  @Put(':id')
  async updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTasksDto,
  ) {
    try {
      return this.taskServices.updateTaskById(id, updateTaskDto);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }
  @Delete(':id')
  async deleteTaskById(@Param('id') id: string) {
    try {
      return this.taskServices.deleteTaskById(id);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }

  @Post('/filter/:pageNumber/:limit')
  async listTasksByFilter(
    @Param('pageNumber') pageNumber: number = 1,
    @Param('limit') limit: number = 10,
    @Body() listTaskDto: ListTasksDto,
  ) {
    try {
      return this.taskServices.listAllTasksByFilter(
        pageNumber,
        limit,
        listTaskDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
