import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ingredient } from './ingredient.model';

@Module({
  imports: [SequelizeModule.forFeature([Ingredient])],
  providers: [IngredientsService],
  controllers: [IngredientsController],
  exports: [IngredientsService],
})
export class IngredientsModule {}
