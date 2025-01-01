import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'pizza_password',
      database: 'mydb',
      autoLoadModels: true,
      synchronize: true, // Use only during development
    }),
  ],
})
export class DatabaseModule {}
