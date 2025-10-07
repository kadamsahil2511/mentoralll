import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { User, Mail, Phone, Home, Briefcase, LogOut, MapPin, X } from 'lucide-react';

export const Account: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('employees')
        .select('full_name, email, phone, company_name, working_place, current_residence')
        .eq('email', user.email)
        .single();
      if (error) console.error('Supabase fetch error:', error);
      else setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleClose = () => {
    navigate('/employee-profile'); // Redirect back to employeeprofile
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-800 dark:text-gray-200">
        <p className="text-lg mb-4">Please log in to view your account.</p>
        <Link to="/login">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-800 dark:text-gray-200">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col relative">
      {/* Cross button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full"
      >
        <X size={20} />
      </button>

      <div className="w-full bg-primary dark:bg-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <img
            src={'https://i.pinimg.com/736x/32/1e/56/321e56020c08858a144cab0dfb926e87.jpg'}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-white">{profile?.full_name || 'No Name'}</h1>
            <p className="text-white mt-1">{profile?.email || user.email}</p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-auto flex gap-2 flex-wrap">
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 text-red-600 border-red-600 hover:bg-red">
              <LogOut size={18} /> Logout
            </Button>
            <Link to="/register">
              <Button className="bg-black text-primary hover:bg-gray">Register / Update</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-6 mt-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <User size={20} />
            <span className="font-semibold text-gray-700 dark:text-gray-200">Full Name</span>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 dark:text-white">{profile?.full_name || 'Not provided'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Mail size={20} />
            <span className="font-semibold text-gray-700 dark:text-gray-200">Email</span>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 dark:text-white">{profile?.email || user.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Phone size={20} />
            <span className="font-semibold text-gray-700 dark:text-gray-200">Phone</span>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 dark:text-white">{profile?.phone || 'Not provided'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Briefcase size={20} />
            <span className="font-semibold text-gray-700 dark:text-gray-200">Company Name</span>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 dark:text-white">{profile?.company_name || 'Not provided'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Home size={20} />
            <span className="font-semibold text-gray-700 dark:text-gray-200">Working Place</span>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 dark:text-white">{profile?.working_place || 'Not provided'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <MapPin size={20} />
            <span className="font-semibold text-gray-700 dark:text-gray-200">Current Residence</span>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 dark:text-white">{profile?.current_residence || 'Not provided'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
