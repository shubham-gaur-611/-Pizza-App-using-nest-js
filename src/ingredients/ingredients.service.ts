import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ingredient } from './ingredient.model';

@Injectable()
export class IngredientsService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Ingredient)
    private readonly ingredientModel: typeof Ingredient,
  ) {}

  async onApplicationBootstrap() {
    const baseIngredients = {
      sauces: [
        { id: 's1', name: 'Marinara', price: 0, image: '🍅' },
        { id: 's2', name: 'BBQ', price: 1.0, image: '🥫' },
        { id: 's3', name: 'Alfredo', price: 1.5, image: '🥛' },
        { id: 's4', name: 'Pesto', price: 2.0, image: '🌿' },
      ],
      cheeses: [
        { id: 'c1', name: 'Mozzarella', price: 0, image: '🧀' },
        { id: 'c2', name: 'Cheddar', price: 1.0, image: '🧀' },
        { id: 'c3', name: 'Parmesan', price: 1.5, image: '🧀' },
        { id: 'c4', name: 'Gouda', price: 1.5, image: '🧀' },
        { id: 'c5', name: 'Blue Cheese', price: 2.0, image: '🧀' },
      ],
      toppings: [
        { id: 't1', name: 'Pepperoni', price: 2.5, image: '🍖' },
        { id: 't2', name: 'Mushrooms', price: 1.5, image: '🍄' },
        { id: 't3', name: 'Bell Peppers', price: 1.0, image: '🫑' },
        { id: 't4', name: 'Onions', price: 1.0, image: '🧅' },
        { id: 't5', name: 'Olives', price: 1.5, image: '🫒' },
      ],
    };

    for (const category in baseIngredients) {
      const ingredients = baseIngredients[category];
      for (const ingredient of ingredients) {
        const existing = await this.ingredientModel.findOne({
          where: { id: ingredient.id },
        });

        if (!existing) {
          await this.ingredientModel.create({
            ...ingredient,
            category,
          });
        }
      }
    }
  }

  async getAll(){
    const ingredients = await this.ingredientModel.findAll();
    
    // Group ingredients by category
    const categorizedIngredients = {
      sauces: ingredients.filter(i => i.id.startsWith('s')),
      cheeses: ingredients.filter(i => i.id.startsWith('c')),
      toppings: ingredients.filter(i => i.id.startsWith('t'))
    };
    
    return categorizedIngredients;
  }
}
