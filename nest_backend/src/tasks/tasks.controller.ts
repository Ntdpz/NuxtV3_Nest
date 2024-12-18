import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body('text') text: string): Promise<Task> {
    return this.taskService.createTask(text);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body('text') text: string,
  ): Promise<Task> {
    return this.taskService.updateTask(id, text);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Put('toggle-completion/:id')
  async toggleTaskCompletion(@Param('id') id: number): Promise<Task> {
    return this.taskService.toggleTaskCompletion(id);
  }
}
