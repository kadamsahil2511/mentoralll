import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mentoringRequests, users } from '../../data/mockData';
import { UserRole } from '../../types';
import { format, parseISO } from 'date-fns';

export const MentoringDashboard: React.FC = () => {
    const { user } = useAuth();
    
    const relevantRequests = user?.role === UserRole.JUNIOR
        ? mentoringRequests.filter(req => req.juniorId === user.id)
        : mentoringRequests.filter(req => req.seniorId === user?.id);

    const getStatusChip = (status: 'Pending' | 'Accepted' | 'Completed' | 'Cancelled') => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'Accepted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
            case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mentoring Dashboard</h1>
                {user?.role === UserRole.JUNIOR && (
                    <Link to="/mentoring/request">
                        <Button>Request a Session</Button>
                    </Link>
                )}
            </div>
            
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Your Mentoring Sessions</h2>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b dark:border-gray-700">
                                <tr>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        {user?.role === UserRole.JUNIOR ? 'Mentor' : 'Mentee'}
                                    </th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Subject</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relevantRequests.map(req => {
                                    const otherUserId = user?.role === UserRole.JUNIOR ? req.seniorId : req.juniorId;
                                    const otherUser = users.find(u => u.id === otherUserId);
                                    return (
                                        <tr key={req.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={otherUser?.profilePicture} alt={otherUser?.fullName} className="w-8 h-8 rounded-full" />
                                                    <span className="font-medium">{otherUser?.fullName}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">{req.subject}</td>
                                            <td className="py-3 px-4">{format(parseISO(req.preferredDate), 'PP')}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusChip(req.status)}`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <Button variant="ghost" size="sm">View Details</Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {relevantRequests.length === 0 && <p className="text-center py-10 text-gray-500">No mentoring requests found.</p>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};