import React from 'react';

function PizzaTotal({ total, onAddToCart }) {
  return (
    <div className="flex justify-between items-center mt-6">
      <div className="text-xl font-bold">
        Total: ${total.toFixed(2)}
      </div>
      <button
        onClick={onAddToCart}
        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default PizzaTotal;