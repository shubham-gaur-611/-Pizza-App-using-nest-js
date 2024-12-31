import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { endpoints } from '../config/api';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(endpoints.userOrders(user.email));
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
          console.log(data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const handleDeleteOrder = async () => {
    try {
      const response = await fetch(`${endpoints.userDeleteOrder(user.email)}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-8 text-center">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Order History</h1>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-gray-600">Order ID: </span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div>
                  <span className="text-gray-600">Status: </span>
                  <span className="font-medium capitalize">{order.status}</span>
                </div>
              </div>
              <div className="space-y-4">
                {order.items.map((pizza, index) => (
                  <div
                    key={index}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                  >
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
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center pt-4 border-t">
                <div className="text-gray-600">
                  <span>Ordered on: </span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="text-xl font-bold">
                  Total: ${order.totalAmount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate('/cart')}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Go to Cart
            </button>
            <button
              onClick={handleDeleteOrder}
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors ml-4"
            >
              Delete Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
