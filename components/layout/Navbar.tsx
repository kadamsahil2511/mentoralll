import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { Sun, Moon, GraduationCap, Menu, X } from 'lucide-react';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-primary dark:hover:text-blue-400 ${
      isActive ? 'text-primary dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-300'
    }`;

  const renderNavLinks = () => (
    <>
      {isAuthenticated ? (
        <>
          {(user?.role === UserRole.JUNIOR || user?.role === UserRole.SENIOR) && (
            <NavLink to="/dashboard" className={navLinkClasses}>
              Dashboard
            </NavLink>
          )}
          <NavLink to="/mentoring" className={navLinkClasses}>
            Mentoring
          </NavLink>
          <NavLink to="/counselling" className={navLinkClasses}>
            Counselling
          </NavLink>
          <NavLink to="/chat" className={navLinkClasses}>
            Chat
          </NavLink>
        </>
      ) : (
        <NavLink to="/" className={navLinkClasses}>
          Home
        </NavLink>
      )}
      <NavLink to="/donations" className={navLinkClasses}>
        Donations
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 text-2xl font-bold text-primary">
            <GraduationCap size={28} />
            <span>MentorAlll</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">{renderNavLinks()}</div>
          <div className="flex items-center space-x-4">
            <Button onClick={toggleTheme} variant="ghost" size="sm" className="px-2">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
            {isAuthenticated ? (
              <Link to="/account">
                <img
                  src={user?.profilePicture || 'https://i.pinimg.com/236x/a5/c3/a8/a5c3a8548ad0ea014d242f1477cdcf0b.jpg'}
                  alt="profile"
                  className="w-9 h-9 rounded-full border-2 border-primary cursor-pointer hover:scale-105 transition-transform"
                />
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
            )}
            <div className="md:hidden">
              <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} variant="ghost" size="sm" className="px-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-gray-900"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              {renderNavLinks()}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 w-full flex flex-col items-center gap-2">
                {isAuthenticated ? (
                  <Link to="/account" className="w-3/4 flex items-center gap-2">
                    <img
                      src={'https://i.pinimg.com/736x/32/1e/56/321e56020c08858a144cab0dfb926e87.jpg'}
                      alt="profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-800 dark:text-white font-medium">{user?.fullName}</span>
                  </Link>
                ) : (
                  <div className="flex flex-col items-center space-y-2 w-full">
                    <Link to="/login" className="w-3/4">
                      <Button variant="ghost" size="sm" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" className="w-3/4">
                      <Button variant="primary" size="sm" className="w-full">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
                <Button onClick={toggleTheme} variant="ghost" size="sm" className="px-2 mt-2">
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
