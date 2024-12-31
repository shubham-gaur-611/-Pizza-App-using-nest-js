import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { endpoints } from '../config/api';

function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('pizza-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('pizza-cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cart]);

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(endpoints.orders, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: user.email,
          items: cart,
          totalAmount: cart.reduce((sum, pizza) => sum + pizza.totalPrice, 0)
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Order placed successfully!');
        setCart([]); // Clear cart after checkout
        localStorage.removeItem('pizza-cart');
        window.dispatchEvent(new Event('cartUpdated'));
        navigate('/orders'); // Redirect to order history
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order');
    }
  };

  const total = cart.reduce((sum, pizza) => sum + pizza.totalPrice, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="mt-2 text-gray-600">Add some delicious pizzas to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {cart.map((pizza, index) => (
          <div
            key={index}
            className="border-b last:border-b-0 py-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">Custom Pizza</h3>
              <p className="text-gray-600 text-sm">
                <strong>Sauce:</strong> {pizza.sauce.name}<br />
                <strong>Cheese:</strong> {pizza.cheeses.map(c => c.name).join(', ')}<br />
                {pizza.toppings.length > 0 && (
                  <><strong>Toppings:</strong> {pizza.toppings.map(t => t.name).join(', ')}</>
                )}
              </p>
              <p className="font-bold mt-1">${pizza.totalPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeFromCart(index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>
          <button
            onClick={handleCheckout}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
            disabled={!user}
          >
            {!user ? 'Login to Checkout' : 'Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;