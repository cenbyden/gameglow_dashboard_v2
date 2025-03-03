import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Settings, Home, ShoppingCart, Image } from 'lucide-react';

const NavBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    {
      name: 'Stats',
      path: '/stats',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      name: 'Setup',
      path: '/setup',
      icon: <Settings className="w-5 h-5" />
    },
    {
      name: 'Dashboard',
      path: '/',
      icon: <Home className="w-5 h-5" />
    },
    {
      name: 'Shop',
      path: '/shop',
      icon: <ShoppingCart className="w-5 h-5" />
    },
    {
      name: 'Gallery',
      path: '/gallery',
      icon: <Image className="w-5 h-5" />
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div className="glass-dark px-4 py-2 mx-auto">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
              aria-label={item.name}
            >
              <div 
                className={`relative p-3 rounded-2xl transition-all duration-300 ${
                  currentPath === item.path 
                    ? 'bg-dark-nav breathing-glow' 
                    : 'hover:bg-dark-nav/50'
                }`}
              >
                {item.icon}
              </div>
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
