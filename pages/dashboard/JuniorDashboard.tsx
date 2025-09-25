
import React from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search, MapPin, Building, Briefcase, Bookmark, ExternalLink } from 'lucide-react';
import { internships, users } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { UserRole } from '../../types';
import { formatDistanceToNow, parseISO } from 'date-fns';

const InternshipCard: React.FC<{ internship: typeof internships[0] }> = ({ internship }) => {
    const senior = users.find(u => u.id === internship.postedById);
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-primary">{internship.title}</h3>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{internship.company}</p>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-primary dark:bg-blue-900/50">{internship.branch}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <MapPin size={14} className="mr-2"/> {internship.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Briefcase size={14} className="mr-2"/> {internship.duration}
                </div>
                <p className="mt-2 font-semibold text-accent">{internship.stipend}</p>
            </CardContent>
            <div className="p-4 border-t dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                    <img src={senior?.profilePicture} alt={senior?.fullName} className="w-8 h-8 rounded-full mr-2"/>
                    <div>
                        <p className="text-sm font-semibold">{senior?.fullName}</p>
                        <p className="text-xs text-gray-500">{`Posted ${formatDistanceToNow(parseISO(internship.postedDate))} ago`}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="px-2"><Bookmark size={16}/></Button>
                    <Link to={`/internships/${internship.id}`}>
                        <Button variant="primary" size="sm">Apply</Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export const JuniorDashboard: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Search and Filters */}
            <Card className="mb-8">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" placeholder="Search by title, company..." className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"/>
                    </div>
                    <select className="w-full md:w-auto border rounded-md py-2 px-3 dark:bg-gray-700 dark:border-gray-600">
                        <option>All Branches</option>
                        <option>B.Tech</option>
                        <option>BBA</option>
                        <option>MBA</option>
                    </select>
                    <Button className="w-full md:w-auto">
                        <Search size={18} className="mr-2"/> Find Internships
                    </Button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Internship Grid */}
                <div className="lg:col-span-3">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Featured Internships</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {internships.map(internship => (
                            <InternshipCard key={internship.id} internship={internship} />
                        ))}
                    </div>
                </div>

                {/* Alumni Profiles */}
                <div className="lg:col-span-1">
                     <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Connect with Alumni</h2>
                     <Card>
                        <CardContent className="p-4 space-y-4">
                            {users.filter(u => u.role === UserRole.SENIOR).slice(0, 4).map(senior => (
                                <div key={senior.id} className="flex items-center gap-4">
                                    <img src={senior.profilePicture} alt={senior.fullName} className="w-12 h-12 rounded-full"/>
                                    <div>
                                        <Link to={`/profiles/${senior.id}`} className="font-semibold hover:text-primary">{senior.fullName}</Link>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{senior.position}</p>
                                    </div>
                                    <Link to={`/profiles/${senior.id}`} className="ml-auto text-primary hover:underline">
                                        <ExternalLink size={18} />
                                    </Link>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full mt-2">View All Alumni</Button>
                        </CardContent>
                     </Card>
                </div>
            </div>
        </div>
    );
};
