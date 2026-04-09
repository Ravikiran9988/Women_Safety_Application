import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, LogOut, AlertTriangle, Menu, X, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { logout, admin } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', icon: AlertTriangle, label: 'Dashboard', badge: '🏠' },
    { path: '/history', icon: Clock, label: 'History', badge: '📋' },
  ];

  return (
    <div
      className={`
        h-full bg-white/90 border-r soft-divider shadow-xl
        flex flex-col z-30 transition-all duration-300 overflow-hidden
        ${isOpen ? 'w-64' : 'w-0'}
      `}
    >
      <div
        className="w-64 h-full flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b soft-divider">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">SOS Admin</h1>
                <p className="text-xs text-gray-400">Women Safety</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mx-4 mt-4 p-3 bg-gray-50/90 rounded-xl border soft-divider">
          <p className="text-xs text-gray-400 mb-0.5">Logged in as</p>
          <p className="text-sm font-semibold text-gray-800 truncate">
            {admin?.name || admin?.email || 'Admin'}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ path, icon: Icon, label, badge }) => (
            <Link
              key={path}
              to={path}
              onClick={() => onClose?.()}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                ${isActive(path)
                  ? 'bg-red-50 text-red-600 border-l-4 border-red-500 pl-2'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm">{label}</span>
              <span className="ml-auto text-base">{badge}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t soft-divider p-3 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </button>

          <button
            onClick={() => { logout(); onClose?.(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-xs text-gray-400 border-t soft-divider">
          <p>Women Safety Admin v1.0</p>
          <p>© 2024 All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export const TopBar = ({ onMenuClick }) => {
  const [timeText, setTimeText] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeText(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/85 backdrop-blur border-b soft-divider shadow-sm sticky top-0 z-30 flex-shrink-0">
      <div className="px-5 py-3 flex items-center justify-between">
        {/* Hamburger — visible on all sizes for toggle */}
        <button
          onClick={onMenuClick}
          className="text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Right side status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-700">System Online</span>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">
            {timeText}
          </span>
        </div>
      </div>
    </div>
  );
};
