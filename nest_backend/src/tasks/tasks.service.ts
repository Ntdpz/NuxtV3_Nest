import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    const options: FindOneOptions<Task> = {
      where: { id },
    };
    return this.taskRepository.findOne(options);
  }

  async createTask(text: string): Promise<Task> {
    const newTask = this.taskRepository.create({ text });
    return this.taskRepository.save(newTask);
  }

  async updateTask(id: number, text: string): Promise<Task> {
    const task = await this.getTaskById(id);
    if (task) {
      task.text = text;
      task.completed = false;
      return this.taskRepository.save(task);
    }
    throw new Error('Task not found');
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.getTaskById(id);
    if (task) {
      await this.taskRepository.remove(task);
    } else {
      throw new Error('Task not found');
    }
  }

  async toggleTaskCompletion(id: number): Promise<Task> {
    const task = await this.getTaskById(id);
    if (task) {
      task.completed = !task.completed;
      return this.taskRepository.save(task);
    }
    throw new Error('Task not found');
  }
}
