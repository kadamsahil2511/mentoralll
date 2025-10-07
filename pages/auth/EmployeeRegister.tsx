import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

type EmployeeForm = {
  fullName: string;
  phone: string;
  currentResidence: string;
  companyName: string;
  workingPlace: string;
};

export const EmployeeRegister: React.FC = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<EmployeeForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<EmployeeForm> = async (data) => {
    const { data: userData } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('employees')
      .insert([{
        id: userData.user?.id,
        full_name: data.fullName,
        email: userData.user?.email,
        phone: data.phone,
        current_residence: data.currentResidence,
        company_name: data.companyName,
        working_place: data.workingPlace
      }]);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      navigate('/employee-profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
      <input {...register('fullName', { required: true })} placeholder="Full Name" className="w-full input" />
      <input {...register('phone', { required: true })} placeholder="Phone Number" type="tel" className="w-full input" />
      <input {...register('currentResidence', { required: true })} placeholder="Current Residence (City)" className="w-full input" />
      <input {...register('companyName', { required: true })} placeholder="Company Name" className="w-full input" />
      <input {...register('workingPlace', { required: true })} placeholder="Working Place (City)" className="w-full input" />
      <Button type="submit" isLoading={isSubmitting} className="w-full mt-4">Complete Registration</Button>
    </form>
  );
};
