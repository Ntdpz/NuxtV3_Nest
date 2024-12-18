import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test-database-connection')
  async testDatabaseConnection() {
    try {
      await this.appService.checkDatabaseConnection();
      return { message: 'Database connected successfully' };
    } catch (error) {
      console.error('Database connection error:', error.message);
      return { message: 'Database connection failed' };
    }
  }
}
