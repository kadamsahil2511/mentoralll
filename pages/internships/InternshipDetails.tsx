
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { internships, users } from '../../data/mockData';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { ArrowLeft, MapPin, Briefcase, Calendar, DollarSign, UserCheck, CheckCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export const InternshipDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const internship = internships.find(i => i.id === id);
    const senior = internship ? users.find(u => u.id === internship.postedById) : null;

    if (!internship || !senior) {
        return <div className="text-center py-20">Internship not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-primary mb-6 hover:underline">
                <ArrowLeft size={18} />
                Back to Dashboard
            </Link>

            <Card>
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Column */}
                        <div className="flex-grow">
                            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-2 ${internship.type === 'Job' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {internship.type}
                            </span>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{internship.title}</h1>
                            <h2 className="text-xl font-semibold text-secondary mt-1">{internship.company}</h2>

                            <div className="mt-6 grid grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2"><MapPin size={18} /><span>{internship.location}</span></div>
                                <div className="flex items-center gap-2"><Briefcase size={18} /><span>{internship.duration}</span></div>
                                <div className="flex items-center gap-2"><DollarSign size={18} /><span>{internship.stipend}</span></div>
                                <div className="flex items-center gap-2"><Calendar size={18} /><span>Apply by {format(parseISO(internship.deadline), 'PPP')}</span></div>
                            </div>
                            
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
                                <p className="text-gray-600 dark:text-gray-400">{internship.description}</p>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Requirements</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                                    {internship.requirements.map((req, i) => <li key={i}>{req}</li>)}
                                </ul>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="md:w-64 flex-shrink-0">
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-white">Posted By</h3>
                                <div className="flex flex-col items-center text-center">
                                    <img src={senior.profilePicture} alt={senior.fullName} className="w-20 h-20 rounded-full mb-3" />
                                    <Link to={`/profiles/${senior.id}`} className="font-bold text-primary hover:underline">{senior.fullName}</Link>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{senior.position}</p>
                                    <div className="flex items-center gap-1 text-sm text-success mt-2">
                                        <UserCheck size={16} />
                                        <span>Verified Alumni</span>
                                    </div>
                                </div>
                                <Button className="w-full mt-6">
                                    <CheckCircle size={18} className="mr-2"/>
                                    Apply Now
                                </Button>
                                <p className="text-center text-sm text-gray-500 mt-2">{internship.applications} students have applied</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
