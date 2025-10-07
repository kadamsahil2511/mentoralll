import React from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Briefcase, Users, MessageSquare, PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import { format, parseISO } from 'date-fns';
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
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export const EmployeeDashboard: React.FC = () => {

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
                <p className="text-gray-600">Here's what's happening on your dashboard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={Briefcase} title="Posted Internships" value={5} color="bg-primary" />
                <StatCard icon={Users} title="Total Applications" value={12} color="bg-secondary" />
                <StatCard icon={MessageSquare} title="Active Chats" value={3} color="bg-accent" />
                <StatCard icon={Users} title="Mentoring Requests" value={2} color="bg-warning" />
            </div>

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
                                {internships.map((internship) => (
                                    <div key={internship.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-primary">{internship.title}</h3>
                                            <p className="text-sm text-gray-600">{internship.company} - {internship.location}</p>
                                            <p className="text-sm text-gray-500 mt-1">Deadline: {format(parseISO(internship.deadline), 'PPP')}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" className="px-2"><Eye size={16} /></Button>
                                            <Button variant="ghost" size="sm" className="px-2"><Edit size={16} /></Button>
                                            <Button variant="ghost" size="sm" className="px-2 text-error"><Trash2 size={16} /></Button>
                                            <Button size="sm">{internship.applications} Applications</Button>
                                        </div>
                                    </div>
                                ))}
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
                                {mentoringRequests.slice(0, 3).map((req) => (
                                    <div key={req.id} className="p-3 border rounded-md">
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
export default EmployeeDashboard;