import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from '../../config/db';
import { TaskModule } from '../tasks/tasks.module'; 
import { TasksController } from '../tasks/tasks.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig, 
    }),
    TaskModule,
  ],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {}
