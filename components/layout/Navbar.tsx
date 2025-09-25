
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { Sun, Moon, Briefcase, GraduationCap, Menu, X } from 'lucide-react';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-primary dark:hover:text-blue-400 ${isActive ? 'text-primary dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-300'}`;

  const renderNavLinks = () => (
    <>
      {isAuthenticated ? (
        <>
          {user?.role === UserRole.JUNIOR && <NavLink to="/dashboard" className={navLinkClasses}>Dashboard</NavLink>}
          {user?.role === UserRole.SENIOR && <NavLink to="/dashboard" className={navLinkClasses}>Dashboard</NavLink>}
          <NavLink to="/mentoring" className={navLinkClasses}>Mentoring</NavLink>
          <NavLink to="/counselling" className={navLinkClasses}>Counselling</NavLink>
          <NavLink to="/chat" className={navLinkClasses}>Chat</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
        </>
      )}
       <NavLink to="/donations" className={navLinkClasses}>Donations</NavLink>
    </>
  );

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 text-2xl font-bold text-primary">
              <GraduationCap size={28} />
              <span>MentorAlll</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {renderNavLinks()}
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-4">
              <Button onClick={toggleTheme} variant="ghost" size="sm" className="px-2">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </Button>
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                    <img src={user?.profilePicture} alt="profile" className="w-8 h-8 rounded-full" />
                    <Button onClick={logout} variant="outline" size="sm">Logout</Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                  <Link to="/register"><Button variant="primary" size="sm">Register</Button></Link>
                </div>
              )}
            </div>
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
                    <>
                     <div className="flex items-center space-x-2">
                        <img src={user?.profilePicture} alt="profile" className="w-8 h-8 rounded-full" />
                        <span className="text-gray-800 dark:text-white font-medium">{user?.fullName}</span>
                     </div>
                     <Button onClick={logout} variant="outline" size="sm" className="w-3/4">Logout</Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center space-y-2 w-full">
                       <Link to="/login" className="w-3/4"><Button variant="ghost" size="sm" className="w-full">Login</Button></Link>
                       <Link to="/register" className="w-3/4"><Button variant="primary" size="sm" className="w-full">Register</Button></Link>
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
