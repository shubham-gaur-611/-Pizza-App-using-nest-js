export const API_BASE_URL = 'http://localhost:3000';

export const endpoints = {
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  me: `${API_BASE_URL}/auth/me`,
  orders: `${API_BASE_URL}/orders`,
  userOrders: (email) => `${API_BASE_URL}/orders/user/${email}`,
  orderById: (id) => `${API_BASE_URL}/orders/${id}`,
  userDeleteOrder: (email) => `${API_BASE_URL}/orders/user_delete/${email}`,
};
