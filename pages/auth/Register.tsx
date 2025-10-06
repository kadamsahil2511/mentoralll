
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { GraduationCap } from 'lucide-react';
import { UserRole } from '../../types';

type RegisterFormInputs = {
  role: UserRole;
  fullName: string;
  email: string;
  phone: string;
  currentResidence: string;
  // Senior-specific
  companyName?: string;
  workingPlace?: string;
  // Junior-specific
  course?: 'B.Tech' | 'BBA' | 'MBA';
  currentYear?: '1st' | '2nd' | '3rd' | '4th' | 'Final';
};

export const Register: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterFormInputs>({
    defaultValues: { role: UserRole.JUNIOR }
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const selectedRole = watch('role');

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    console.log("Registration Data:", data);
    // Simulate API call
    await new Promise(res => setTimeout(res, 1500));
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <Card className="w-full max-w-md text-center">
                <CardContent className="p-8">
                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Registration Successful!</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Thank you for joining MentorAlll. You can now log in to your account.</p>
                    <Link to="/login" className="mt-8 block">
                        <Button className="w-full">Go to Login</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2 text-3xl font-bold text-primary">
                <GraduationCap size={32} />
                <span>Mentorall</span>
            </Link>
        </div>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Create your account</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">I am a...</label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <label className={`relative flex items-center p-3 border rounded-md cursor-pointer ${selectedRole === UserRole.JUNIOR ? 'bg-blue-50 border-primary dark:bg-blue-900/50' : 'border-gray-300 dark:border-gray-600'}`}>
                    <input type="radio" {...register('role')} value={UserRole.JUNIOR} className="sr-only"/>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Student</span>
                  </label>
                  <label className={`relative flex items-center p-3 border rounded-md cursor-pointer ${selectedRole === UserRole.SENIOR ? 'bg-blue-50 border-primary dark:bg-blue-900/50' : 'border-gray-300 dark:border-gray-600'}`}>
                    <input type="radio" {...register('role')} value={UserRole.SENIOR} className="sr-only"/>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Employee</span>
                  </label>
                </div>
              </div>

              {/* Common Fields */}
              <input {...register('fullName', { required: true })} placeholder="Full Name" className="w-full input" />
              <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" type="email" className="w-full input" />
              <input {...register('phone', { required: true })} placeholder="Phone Number" type="tel" className="w-full input" />
              <input {...register('currentResidence', { required: true })} placeholder="Current Residence (City)" className="w-full input" />

              {/* Senior Fields */}
              {selectedRole === UserRole.SENIOR && (
                <>
                  <input {...register('companyName', { required: true })} placeholder="Company Name" className="w-full input" />
                  <input {...register('workingPlace', { required: true })} placeholder="Working Place (City)" className="w-full input" />
                </>
              )}

              {/* Junior Fields */}
              {selectedRole === UserRole.JUNIOR && (
                <>
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
                </>
              )}

              <div>
                <Button type="submit" isLoading={isSubmitting} className="w-full mt-4">
                  Create Account
                </Button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.innerHTML = `
.input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #D1D5DB; /* gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  color: #111827; /* gray-900 */
  background-color: #FFFFFF; /* white */
}
.dark .input {
  background-color: #374151; /* gray-700 */
  border-color: #4B5563; /* gray-600 */
  color: #F9FAFB; /* gray-50 */
}
.input:focus {
  outline: none;
  border-color: #3B82F6; /* primary */
  box-shadow: 0 0 0 1px #3B82F6;
}
`;
document.head.appendChild(style);
