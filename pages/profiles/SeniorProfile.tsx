
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { users, internships } from '../../data/mockData';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { ArrowLeft, Building, Briefcase, MapPin, MessageSquare, UserPlus, CheckCircle } from 'lucide-react';

export const SeniorProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const senior = users.find(u => u.id === id);
    const postedInternships = internships.filter(i => i.postedById === id);

    if (!senior) {
        return <div className="text-center py-20">Profile not found.</div>;
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Link to="/dashboard" className="inline-flex items-center gap-2 text-primary mb-6 hover:underline">
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel: Profile Info */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-6 text-center">
                                <img src={senior.profilePicture} alt={senior.fullName} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary" />
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{senior.fullName}</h1>
                                <p className="text-secondary font-semibold">{senior.position}</p>
                                <div className="flex items-center justify-center gap-1 text-sm text-success mt-1">
                                    <CheckCircle size={16} />
                                    <span>Verified Alumni</span>
                                </div>
                                <div className="mt-6 text-left space-y-3 text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-3"><Building size={18} /><span className="font-medium">{senior.company}</span></div>
                                    <div className="flex items-center gap-3"><MapPin size={18} /><span>{senior.currentResidence}</span></div>
                                    <div className="flex items-center gap-3"><Briefcase size={18} /><span>{senior.experience} years of experience</span></div>
                                </div>
                                <div className="mt-6 flex flex-col gap-3">
                                    <Button variant="primary" className="w-full"><MessageSquare size={16} className="mr-2"/>Message</Button>
                                    <Button variant="outline" className="w-full"><UserPlus size={16} className="mr-2"/>Request Mentoring</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Panel: Details & Internships */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader><h2 className="text-xl font-semibold">Expertise</h2></CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {senior.expertise?.map(skill => (
                                        <span key={skill} className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-primary dark:bg-blue-900/50">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><h2 className="text-xl font-semibold">Posted Opportunities</h2></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {postedInternships.map(internship => (
                                        <div key={internship.id} className="p-4 border rounded-lg dark:border-gray-700 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-lg text-primary">{internship.title}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{internship.location}</p>
                                            </div>
                                            <Link to={`/internships/${internship.id}`}>
                                                <Button variant="outline" size="sm">View Details</Button>
                                            </Link>
                                        </div>
                                    ))}
                                    {postedInternships.length === 0 && <p className="text-center text-gray-500">No opportunities posted yet.</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
