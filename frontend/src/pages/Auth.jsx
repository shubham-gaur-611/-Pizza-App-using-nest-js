import { useState } from 'react';
import { endpoints } from '../config/api';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? endpoints.login : endpoints.register;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      alert(data.message);
      // if (response.ok) {
      //   setMessage(isLogin ? 'Login successful!' : 'Registration successful!');
      //   setEmail('');
      //   setPassword('');
      // } else {
      //   setMessage(data.message || (isLogin ? 'Login failed' : 'Registration failed'));
      // }
      if(data.message.includes('Login successful') || data.message.includes('Registration successful')) {
        setMessage(data.message);
      }
      if(data.message.includes('Invalid credentials')) {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(`An error occurred during ${isLogin ? 'login' : 'registration'}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          {message && (
            <div className={`text-center ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-center text-red-600 mt-4 hover:text-red-800"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}

export default Auth;
