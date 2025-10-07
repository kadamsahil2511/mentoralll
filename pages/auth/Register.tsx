import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { UserRole } from '../../types';
import { StudentRegister } from './StudentRegister';
import { EmployeeRegister } from './EmployeeRegister';

export const Register: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.JUNIOR);

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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">I am a...</label>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <label
                  className={`relative flex items-center p-3 border rounded-md cursor-pointer ${
                    role === UserRole.JUNIOR
                      ? 'bg-blue-50 border-primary dark:bg-blue-900/50'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onClick={() => setRole(UserRole.JUNIOR)}
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Student</span>
                </label>
                <label
                  className={`relative flex items-center p-3 border rounded-md cursor-pointer ${
                    role === UserRole.SENIOR
                      ? 'bg-blue-50 border-primary dark:bg-blue-900/50'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onClick={() => setRole(UserRole.SENIOR)}
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Employee</span>
                </label>
              </div>
            </div>

            {/* Load specific form */}
            {role === UserRole.JUNIOR ? <StudentRegister /> : <EmployeeRegister />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
