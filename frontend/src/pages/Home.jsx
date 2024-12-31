import { baseIngredients } from '../config/ingredients';
import IngredientSection from '../components/IngredientSection';
import PizzaTotal from '../components/PizzaTotal';
import { usePizzaBuilder } from '../hooks/usePizzaBuilder';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const basePrice = 10;
  const {
    selectedSauce,
    selectedCheese,
    selectedToppings,
    toggleSauce,
    toggleCheese,
    toggleTopping,
    calculateTotal,
    resetSelections,
    createPizza,
  } = usePizzaBuilder(basePrice);

  const addToCart = (pizza) => {
    const savedCart = localStorage.getItem('pizza-cart');
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    const updatedCart = [...currentCart, pizza];
    localStorage.setItem('pizza-cart', JSON.stringify(updatedCart));
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleAddToCart = () => {
    try {
      const pizza = createPizza();
      addToCart(pizza);
      resetSelections();
      //navigate('/cart'); // Navigate to cart after adding item
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Build Your Pizza</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Base Pizza: ${basePrice}</h2>
        
        <IngredientSection
          title="1. Choose Your Sauce"
          ingredients={baseIngredients.sauces}
          selected={selectedSauce}
          onToggle={toggleSauce}
        />

        <IngredientSection
          title="2. Select Cheese"
          ingredients={baseIngredients.cheeses}
          selected={selectedCheese}
          onToggle={toggleCheese}
        />

        <IngredientSection
          title="3. Add Toppings"
          ingredients={baseIngredients.toppings}
          selected={selectedToppings}
          onToggle={toggleTopping}
        />

        <PizzaTotal 
          total={calculateTotal()} 
          onAddToCart={handleAddToCart} 
        />
      </div>
    </div>
  );
}

export default Home;