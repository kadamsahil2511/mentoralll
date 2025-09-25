
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { users } from '../../data/mockData';
import { UserRole } from '../../types';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { ArrowLeft } from 'lucide-react';

type RequestFormInputs = {
    mentorId: string;
    sessionType: string;
    subject: string;
    description: string;
    preferredDate: string;
    duration: number;
};

export const MentoringRequest: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RequestFormInputs>();
    const navigate = useNavigate();
    const seniors = users.filter(u => u.role === UserRole.SENIOR);

    const onSubmit: SubmitHandler<RequestFormInputs> = async (data) => {
        console.log("Mentoring Request Data:", data);
        await new Promise(res => setTimeout(res, 1000));
        navigate('/mentoring');
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Link to="/mentoring" className="inline-flex items-center gap-2 text-primary mb-6 hover:underline">
                <ArrowLeft size={18} />
                Back to Mentoring Dashboard
            </Link>
            <Card>
                <CardHeader>
                    <h1 className="text-2xl font-bold">Request a Mentoring Session</h1>
                    <p className="text-gray-600 dark:text-gray-400">Fill out the form below to connect with an experienced alumni.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="label">Select a Mentor</label>
                            <select {...register('mentorId', { required: true })} className="input w-full">
                                {seniors.map(senior => (
                                    <option key={senior.id} value={senior.id}>{senior.fullName} - {senior.position} at {senior.company}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="label">Session Type</label>
                            <select {...register('sessionType', { required: true })} className="input w-full">
                                <option>Career</option>
                                <option>Technical</option>
                                <option>Academic</option>
                                <option>Personal</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Subject</label>
                            <input {...register('subject', { required: true })} placeholder="e.g., Resume Review" className="input w-full" />
                        </div>
                        <div>
                            <label className="label">Detailed Description</label>
                            <textarea {...register('description', { required: true })} rows={4} placeholder="Briefly describe what you'd like to discuss..." className="input w-full"></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="label">Preferred Date</label>
                                <input type="date" {...register('preferredDate', { required: true })} className="input w-full" />
                            </div>
                            <div>
                                <label className="label">Duration (minutes)</label>
                                <select {...register('duration', { required: true, valueAsNumber: true })} className="input w-full">
                                    <option value={30}>30 minutes</option>
                                    <option value={45}>45 minutes</option>
                                    <option value={60}>60 minutes</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" isLoading={isSubmitting}>Submit Request</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
// Add shared styles to head
const style = document.createElement('style');
style.innerHTML = `
.input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.375rem;
  background-color: #FFFFFF;
}
.dark .input {
  background-color: #374151;
  border-color: #4B5563;
  color: #F9FAFB;
}
.label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}
.dark .label {
    color: #D1D5DB;
}
`;
document.head.appendChild(style);
