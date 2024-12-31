import { useState } from 'react';

export function usePizzaBuilder(basePrice) {
  const [selectedSauce, setSelectedSauce] = useState([]);
  const [selectedCheese, setSelectedCheese] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);

  const toggleSauce = (sauce) => {
    setSelectedSauce([sauce]); // Only one sauce at a time
  };

  const toggleCheese = (cheese) => {
    setSelectedCheese((prev) =>
      prev.includes(cheese)
        ? prev.filter((c) => c !== cheese)
        : [...prev, cheese]
    );
  };

  const toggleTopping = (topping) => {
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const calculateTotal = () => {
    const sauceTotal = selectedSauce.reduce((sum, item) => sum + item.price, 0);
    const cheeseTotal = selectedCheese.reduce((sum, item) => sum + item.price, 0);
    const toppingsTotal = selectedToppings.reduce((sum, item) => sum + item.price, 0);
    return basePrice + sauceTotal + cheeseTotal + toppingsTotal;
  };

  const resetSelections = () => {
    setSelectedSauce([]);
    setSelectedCheese([]);
    setSelectedToppings([]);
  };

  const validatePizza = () => {
    if (selectedSauce.length === 0) {
      throw new Error('Please select a sauce for your pizza!');
    }
    if (selectedCheese.length === 0) {
      throw new Error('Please select at least one cheese for your pizza!');
    }
  };

  const createPizza = () => {
    validatePizza();
    return {
      sauce: selectedSauce[0],
      cheeses: selectedCheese,
      toppings: selectedToppings,
      totalPrice: calculateTotal(),
      id: Date.now(),
    };
  };

  return {
    selectedSauce,
    selectedCheese,
    selectedToppings,
    toggleSauce,
    toggleCheese,
    toggleTopping,
    calculateTotal,
    resetSelections,
    createPizza,
  };
}