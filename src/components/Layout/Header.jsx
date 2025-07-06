import React, { useState } from 'react';
import { Bell, Search, Menu, Sun, Moon, Settings, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications for demo
  const notifications = [
    { id: 1, message: "New appointment scheduled for 2:00 PM", time: "5 min ago", type: "info" },
    { id: 2, message: "Patient John Doe checked in", time: "10 min ago", type: "success" },
    { id: 3, message: "Reminder: Staff meeting at 4:00 PM", time: "1 hour ago", type: "warning" }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Enhanced Search */}
          <div className="hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search patients, appointments, treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 w-96 transition-all duration-200"
              />
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-2">
                  <p className="text-sm text-gray-500 p-2">Search results will appear here...</p>
                </div>
              )}
            </div>
          </div>

          {/* Greeting */}
          <div className="hidden lg:block">
            <p className="text-sm text-gray-600">
              {getGreeting()}, <span className="font-semibold text-gray-900">{user?.name?.split(' ')[0] || 'Doctor'}</span>! 
              <span className="ml-2">🌟</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <div className="hidden sm:flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200" title="Settings">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 relative"
              title="Notifications"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{notifications.length}</span>
              </span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-500">{notifications.length} new updates</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{user?.name || user?.email}</p>
              <p className="text-xs text-gray-500 flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  user?.role === 'Admin' ? 'bg-blue-500' : 'bg-green-500'
                }`}></span>
                {user?.role}
              </p>
            </div>
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200 cursor-pointer">
                <span className="text-white font-bold text-sm">
                  {user?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {/* User Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium text-gray-900">{user?.name || user?.email}</p>
                  <p className="text-sm text-gray-500">{user?.role}</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Preferences</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
