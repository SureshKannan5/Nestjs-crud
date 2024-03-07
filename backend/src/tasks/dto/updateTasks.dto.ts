import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './createTasks.dto';

export class UpdateTasksDto extends PartialType(CreateTaskDto) {}
