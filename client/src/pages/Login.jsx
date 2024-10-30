import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import api from '@/services/api';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState('adopter');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // In a real app, you would make an API call here
      // const response = await api.login({ ...formData, userType });
      // For now, we'll simulate a successful login
      const userData = {
        id: '1',
        name: 'Test User',
        email: formData.email
      };
      
      login(userData, userType);
      navigate(userType === 'adopter' ? '/explore' : '/list-pets');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome Back!</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">
            I am a:
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="adopter">Pet Adopter</option>
              <option value="rehomer">Pet Rehomer</option>
            </select>
          </label>
        </div>
        
        <div>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
        </div>
        
        <div>
          <label className="block mb-2">
            Password:
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
        </div>
        
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
