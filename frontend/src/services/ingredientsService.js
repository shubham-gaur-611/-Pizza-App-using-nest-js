import axios from 'axios';
import { endpoints } from '../config/api';

export const getIngredients = async () => {
  try {
    const response = await axios.get(endpoints.ingredients);
    const ingredients = response.data;
    const ingredients_sauces = ingredients.sauces;
    const ingredients_cheeses = ingredients.cheeses;
    const ingredients_toppings = ingredients.toppings;
    // Transform the flat list into categories
    const categorizedIngredients = {
      sauces: ingredients_sauces,
      cheeses: ingredients_cheeses,
      toppings: ingredients_toppings
    };
    
    return categorizedIngredients;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received');
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};
