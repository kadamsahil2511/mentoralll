import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

type SignupForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Signup: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignupForm>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password
    });

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Signup successful! Please check your email to confirm.');
      navigate('/login');
    }
  };

  const password = watch('password');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Create your account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                className="w-full input mt-1"
              />
              {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative mt-1">
                <input
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
              <input
                {...register('confirmPassword', { required: 'Please confirm password', validate: value => value === password || 'Passwords do not match' })}
                type={showPassword ? 'text' : 'password'}
                className="w-full input mt-1"
              />
              {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" isLoading={isSubmitting} className="w-full mt-4">
              Sign Up
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:text-blue-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
