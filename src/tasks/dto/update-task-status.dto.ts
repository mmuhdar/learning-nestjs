import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatuDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
