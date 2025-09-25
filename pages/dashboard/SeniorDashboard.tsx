
import React from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Briefcase, Users, MessageSquare, PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import { internships, mentoringRequests, chatMessages } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Internship } from '../../types';
import { format, parseISO } from 'date-fns';

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

export const SeniorDashboard: React.FC = () => {
    const { user } = useAuth();
    const myInternships = internships.filter(i => i.postedById === user?.id);
    const myMentoringRequests = mentoringRequests.filter(m => m.seniorId === user?.id);

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.fullName}!</h1>
                <p className="text-gray-600 dark:text-gray-400">Here's what's happening on your dashboard.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={Briefcase} title="Posted Internships" value={myInternships.length} color="bg-primary" />
                <StatCard icon={Users} title="Total Applications" value={myInternships.reduce((acc, i) => acc + i.applications, 0)} color="bg-secondary" />
                <StatCard icon={MessageSquare} title="Active Chats" value={chatMessages.filter(c => c.receiverId === user?.id && !c.read).length} color="bg-accent" />
                <StatCard icon={Users} title="Mentoring Requests" value={myMentoringRequests.filter(m=> m.status === 'Pending').length} color="bg-warning" />
            </div>

            {/* Quick Actions & Posted Internships */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Posted Internships</h2>
                            <Button size="sm" variant="primary">
                                <PlusCircle className="mr-2 h-4 w-4"/> Post New
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {myInternships.map(internship => (
                                    <div key={internship.id} className="p-4 border rounded-lg dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-primary">{internship.title}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{internship.company} - {internship.location}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Deadline: {format(parseISO(internship.deadline), 'PPP')}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" className="px-2"><Eye size={16} /></Button>
                                            <Button variant="ghost" size="sm" className="px-2"><Edit size={16} /></Button>
                                            <Button variant="ghost" size="sm" className="px-2 text-error"><Trash2 size={16} /></Button>
                                            <Button size="sm">{internship.applications} Applications</Button>
                                        </div>
                                    </div>
                                ))}
                                {myInternships.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-8">You haven't posted any internships yet.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Mentoring Requests</h2>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {myMentoringRequests.slice(0, 3).map(req => (
                                    <div key={req.id} className="p-3 border rounded-md dark:border-gray-700">
                                        <p className="font-semibold">{req.subject}</p>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{req.status}</span>
                                    </div>
                                ))}
                                <Button variant="ghost" className="w-full">View All Requests</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};