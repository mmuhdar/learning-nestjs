import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Task, TaskStatus, RespondCreate as Respond } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTask(): Task[] {
    return this.tasks;
  }

  createTask(description: string, title: string): Respond {
    const date = new Date();
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
      createdAt: date.toISOString(),
    };
    this.tasks.push(task);
    const respond = {
      message: 'Success Create Data',
      data: this.tasks[this.tasks.length - 1],
    };
    return respond;
  }

  getTaskById(id: string): Respond {
    const index = this.tasks.findIndex((el) => el.id == id);
    const data = this.tasks[index];
    return {
      message: `Success find data with id ${id}`,
      data,
    };
  }
}
