import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

import { Task, TaskStatus, RespondCreate as Respond } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTask(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTask();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          task.description
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        ) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  getTaskById(id: string): Respond {
    const data = this.tasks.find((task) => task.id === id);

    if (!data) {
      throw new NotFoundException(`Task with ID "${id}" Not Found`);
    } else {
      return {
        message: `Success find data with id ${id}`,
        data,
      };
    }
  }

  createTask(createTaskDto: CreateTaskDto): Respond {
    const date = new Date();
    const { title, description } = createTaskDto;
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

  deleteTaskById(id: string): Respond {
    const { data } = this.getTaskById(id);
    const index = this.tasks.findIndex((task) => task.id == id);
    this.tasks.splice(index, 1);

    return {
      message: `Success Delete Data`,
      data,
    };
  }

  updateTaskStatus(id: string, status: TaskStatus): Respond {
    const { data } = this.getTaskById(id);

    const index = this.tasks.findIndex((task) => task.id == id);
    this.tasks[index].status = status;

    return {
      message: `Success update statu with ID ${id}`,
      data,
    };
  }
}
