import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',   // IP ของ MySQL container
  port: 3306,            // พอร์ต MySQL
  username: process.env.MYSQL_USER || 'todo_user',
  password: process.env.MYSQL_PASSWORD || 'todo_password',
  database: process.env.MYSQL_DATABASE || 'todo_db',
  synchronize: true,     // ใช้ synchronize แทน createIfNotExist
  autoLoadEntities: true,
};
