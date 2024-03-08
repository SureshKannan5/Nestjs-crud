import { IsDefined, IsIn, IsNotEmpty } from 'class-validator';

export class ListTasksDto {
  @IsDefined()
  @IsNotEmpty()
  @IsIn(['ALL', 'TODO', 'IN_PROGRESS', 'DONE'], {
    message: 'Status must be one of  ALL, TODO, IN_PROGRESS, DONE',
  })
  status: string;
  @IsDefined()
  @IsNotEmpty()
  @IsIn(['ASC', 'DESC'], {
    message: 'SortKey must be either ASC or DESC',
  })
  sortKey: string;
}
