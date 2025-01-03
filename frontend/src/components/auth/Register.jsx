import { useState } from 'react';
import { endpoints } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(endpoints.register, { email, password });

      // const response = await fetch(endpoints.register, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      const data = await response.data;
      alert(data.message);
      if(data.message.includes('Registration successful')) {
        setMessage(data.message);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register
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
            Register
          </button>
        </form>
        <button
          onClick={() => navigate('/login')}
          className="w-full text-center text-red-600 mt-4 hover:text-red-800"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
