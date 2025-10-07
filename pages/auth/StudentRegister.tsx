import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

type StudentForm = {
  fullName: string;
  email: string;
  phone: string;
  currentResidence: string;
  course: 'B.Tech' | 'BBA' | 'MBA';
  currentYear: '1st' | '2nd' | '3rd' | '4th' | 'Final';
};

export const StudentRegister: React.FC = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<StudentForm>();

  const onSubmit: SubmitHandler<StudentForm> = async (data) => {
    console.log("Student Registration:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
      <input {...register('fullName', { required: true })} placeholder="Full Name" className="w-full input" />
      <input {...register('email', { required: true })} placeholder="Email" type="email" className="w-full input" />
      <input {...register('phone', { required: true })} placeholder="Phone Number" type="tel" className="w-full input" />
      <input {...register('currentResidence', { required: true })} placeholder="Current Residence (City)" className="w-full input" />

      <select {...register('course', { required: true })} className="w-full input">
        <option value="">Select Course</option>
        <option value="B.Tech">B.Tech</option>
        <option value="BBA">BBA</option>
        <option value="MBA">MBA</option>
      </select>

      <select {...register('currentYear', { required: true })} className="w-full input">
        <option value="">Select Current Year</option>
        <option value="1st">1st Year</option>
        <option value="2nd">2nd Year</option>
        <option value="3rd">3rd Year</option>
        <option value="4th">4th Year</option>
        <option value="Final">Final Year</option>
      </select>

      <Button type="submit" isLoading={isSubmitting} className="w-full mt-4">
        Create Student Account
      </Button>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:text-blue-500">
          Sign in
        </Link>
      </p>
    </form>
  );
};
