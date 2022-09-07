import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTask() {
    return this.tasksService.getAllTask();
  }

  @Post()
  createTask(
    @Body('description') description: string,
    @Body('title') title: string,
  ) {
    return this.tasksService.createTask(description, title);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }
}
