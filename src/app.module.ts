import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './database/database.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    OrdersModule,
    IngredientsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
