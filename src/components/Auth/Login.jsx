import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Activity, Mail, Lock, AlertCircle, Stethoscope, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../UI/Button';
import Input from '../UI/Input';

const Login = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dental portal...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      const success = await login(formData.email, formData.password);
      if (!success) {
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Quick login helpers for demo
  const quickLogin = (email, password) => {
    setFormData({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header with personal branding */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <Stethoscope className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Welcome Back! 👋
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Sign in to your <span className="font-semibold text-blue-600">MediCare Pro</span> account
          </p>
          <div className="flex items-center justify-center space-x-2 mt-3">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-500">Caring for smiles since 2020</span>
          </div>
        </div>

        {/* Demo Credentials with better styling */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <h3 className="text-sm font-semibold text-blue-800">Demo Access Credentials</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-blue-700 mb-1">🏥 Admin Portal</p>
                  <p className="text-xs text-gray-600">admin@entnt.in • admin123</p>
                </div>
                <button
                  onClick={() => quickLogin('admin@entnt.in', 'admin123')}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                >
                  Use
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-green-700 mb-1">👤 Patient Portal</p>
                  <p className="text-xs text-gray-600">john@entnt.in • patient123</p>
                </div>
                <button
                  onClick={() => quickLogin('john@entnt.in', 'patient123')}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                >
                  Use
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            loading={isLoggingIn}
            size="lg"
          >
            {isLoggingIn ? 'Signing you in...' : 'Sign In to Portal'}
          </Button>
        </form>

        {/* Footer with personal touch */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-xs">Secure & Trusted</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>
          <p className="text-xs text-gray-500">
            © 2025 MediCare Pro Dental Solutions • Built with ❤️ for better healthcare
          </p>
          <p className="text-xs text-gray-400">
            ENTNT Technical Assignment • Developed by [Your Name]
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
