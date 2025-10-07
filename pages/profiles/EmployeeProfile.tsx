import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Briefcase, Users, MessageSquare, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { internships, mentoringRequests, chatMessages } from '../../data/mockData';

const StatCard = ({ icon, title, value, color }: { icon: React.ElementType, title: string, value: string | number, color: string }) => {
    const Icon = icon;
    return (
        <Card>
            <CardContent className="flex items-center p-4">
                <div className={`p-3 rounded-full mr-4 ${color}`}>
                    <Icon className="text-white" size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export const EmployeeProfile: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            if (!user) return;
            const { data, error } = await supabase
                .from('employees')
                .select('*')
                .eq('id', user.id)
                .single();
            if (error) {
                setEmployeeData(null);
            } else {
                setEmployeeData(data);
            }
            setLoading(false);
        };
        fetchEmployee();
    }, [user]);

    if (!user) return <p className="text-center mt-10">Please register or login to view your profile.</p>;
    if (loading) return <p className="text-center mt-10">Loading...</p>;

    if (!employeeData) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-center">Complete Your Registration</h2>
                <Button onClick={() => navigate('/employee-registration')} className="w-full">
                    Register Now
                </Button>
            </div>
        );
    }

    const myInternships = internships.filter(i => i.postedById === user.id);
    const myMentoringRequests = mentoringRequests.filter(m => m.seniorId === user.id);

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {employeeData.full_name}!</h1>
                    <p className="text-gray-600 dark:text-gray-400">Here's what's happening on your dashboard.</p>
                </div>
                <Button variant="ghost" onClick={() => navigate('/profile-details')}>
                    <User size={24} />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={Briefcase} title="Posted Internships" value={myInternships.length} color="bg-primary" />
                <StatCard icon={Users} title="Total Applications" value={myInternships.reduce((acc, i) => acc + i.applications, 0)} color="bg-secondary" />
                <StatCard icon={MessageSquare} title="Active Chats" value={chatMessages.filter(c => c.receiverId === user.id && !c.read).length} color="bg-accent" />
                <StatCard icon={Users} title="Mentoring Requests" value={myMentoringRequests.filter(m => m.status === 'Pending').length} color="bg-warning" />
            </div>
        </div>
    );
};
