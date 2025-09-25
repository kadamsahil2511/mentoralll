
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Briefcase, Users, HeartHandshake, DollarSign } from 'lucide-react';

const featureCards = [
    {
        icon: Briefcase,
        title: 'Internships & Jobs',
        description: 'Discover exclusive opportunities posted by trusted alumni from top companies.'
    },
    {
        icon: Users,
        title: 'Expert Mentoring',
        description: 'Get personalized guidance from experienced seniors in your field.'
    },
    {
        icon: HeartHandshake,
        title: 'Wellness Support',
        description: 'Access confidential counselling services for your mental well-being.'
    },
    {
        icon: DollarSign,
        title: 'Support a Cause',
        description: 'Contribute to our wellness fund and help fellow students in need.'
    }
];

export const Landing: React.FC = () => {
    return (
        <div className="text-gray-800 dark:text-gray-200">
            {/* Hero Section */}
            <section className="relative text-center py-20 md:py-32 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-800 dark:to-gray-900 opacity-70"></div>
                <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark mask-gradient"></div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Unlock Your Future with <span className="text-primary">MentorAlll</span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        A dedicated platform where current students and successful alumni build powerful connections for career growth, mentorship, and support.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/register">
                            <Button size="lg" variant="primary" className="w-full sm:w-auto">Get Started</Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto">Browse Internships</Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Everything You Need to Succeed</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">One platform, endless opportunities.</p>
                    </div>
                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {featureCards.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="text-center h-full">
                                    <CardContent className="flex flex-col items-center gap-4">
                                        <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full text-primary">
                                            <feature.icon size={32} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// Helper CSS for the grid pattern in a style tag, as we can't create css files.
const style = document.createElement('style');
style.innerHTML = `
.bg-grid-pattern {
    background-image: linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
    background-size: 2rem 2rem;
}
.dark .bg-grid-pattern-dark {
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 2rem 2rem;
}
.mask-gradient {
    mask-image: radial-gradient(circle, white 50%, transparent 100%);
    -webkit-mask-image: radial-gradient(circle, white 50%, transparent 100%);
}
`;
document.head.appendChild(style);
