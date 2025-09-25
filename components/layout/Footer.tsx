
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Linkedin, Twitter, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
             <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
              <GraduationCap size={28} />
              <span>AlumniConnect</span>
            </Link>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
              Connecting students and alumni for a brighter future.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">Home</Link></li>
              <li><Link to="/dashboard" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">Internships</Link></li>
              <li><Link to="/mentoring" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">Mentoring</Link></li>
              <li><Link to="/donations" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">Donate</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">FAQ</a></li>
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">Contact Us</a></li>
              <li><a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">Privacy Policy</a></li>
            </ul>
          </div>
           <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Follow Us</h3>
            <div className="flex mt-4 space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-blue-400"><span className="sr-only">Facebook</span><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-blue-400"><span className="sr-only">Twitter</span><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-blue-400"><span className="sr-only">LinkedIn</span><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} AlumniConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
