import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  async checkDatabaseConnection() {
    try {
      await this.dataSource.initialize();  // Initialize DataSource
      const isConnected = await this.dataSource.isInitialized;
      if (isConnected) {
        console.log('Database connected successfully.');
      } else {
        console.log('Database connection failed.');
      }
    } catch (error) {
      console.error('Database connection error:', error.message);
    }
  }
}
