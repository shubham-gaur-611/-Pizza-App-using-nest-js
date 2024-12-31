import React from 'react';

function IngredientSection({ title, ingredients, selected, onToggle }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            onClick={() => onToggle(ingredient)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selected.includes(ingredient)
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            <div className="text-4xl mb-2">{ingredient.image}</div>
            <h3 className="font-medium">{ingredient.name}</h3>
            <p className="text-gray-600">
              {ingredient.price === 0 
                ? 'Included' 
                : `$${ingredient.price.toFixed(2)}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IngredientSection;