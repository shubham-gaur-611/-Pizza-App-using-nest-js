import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const { user, logout } = useAuth();

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('pizza-cart');
      const currentCart = savedCart ? JSON.parse(savedCart) : [];
      setCartCount(currentCart.length);
    };
    
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-red-600">
            Pizza Builder
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-red-600">
              Build Pizza
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-red-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/orders" className="text-gray-700 hover:text-red-600">
                  My Orders
                </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                
                <span className="text-gray-700">{user.email}</span>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;