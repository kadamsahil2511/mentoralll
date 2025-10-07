import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type LoginFormInputs = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/employee-profile');
    } catch (error: any) {
      setError('email', { type: 'manual', message: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 text-3xl font-bold text-primary">
            <GraduationCap size={32} />
            <span>MentorAlll</span>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Sign in to your account</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.email && <p className="mt-2 text-sm text-error">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.password && <p className="mt-2 text-sm text-error">{errors.password.message}</p>}
                </div>
              </div>

              <div>
                <Button type="submit" isLoading={isSubmitting} className="w-full">
                  Sign in
                </Button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Not a member?{' '}
              <Link to="/signup" className="font-medium text-primary hover:text-blue-500">
                Signup now
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
