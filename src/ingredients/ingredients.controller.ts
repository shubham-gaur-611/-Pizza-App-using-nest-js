import { Controller, Get } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsService) { }
    
    @Get()
    async getAll() {
      return this.ingredientsService.getAll();
    }
   
}
