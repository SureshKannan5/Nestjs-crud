import { IsDefined, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  description: string;
  @IsDefined()
  @IsNotEmpty()
  @IsIn(['TODO', 'IN_PROGRESS', 'DONE'], {
    message: 'Status must be one of TODO, IN_PROGRESS, DONE',
  })
  status: string;
}
