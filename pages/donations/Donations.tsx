
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';

const predefinedAmounts = [100, 500, 1000, 2500, 5000];

export const Donations: React.FC = () => {
    const [amount, setAmount] = useState(1000);
    const goal = 500000;
    const currentProgress = 345000;
    const progressPercentage = (currentProgress / goal) * 100;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <HeartHandshake className="mx-auto h-12 w-12 text-accent" />
                    <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white">Support Student Wellness</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Your contribution provides crucial mental health support to students in need. Every donation makes a difference.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Donation Form */}
                    <Card className="shadow-xl">
                        <CardHeader>
                            <h2 className="text-2xl font-bold">Make a Donation</h2>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Choose an amount (₹)</label>
                                <div className="mt-2 grid grid-cols-3 gap-3">
                                    {predefinedAmounts.map(pa => (
                                        <button key={pa} onClick={() => setAmount(pa)} className={`p-3 border rounded-md text-center font-semibold transition ${amount === pa ? 'bg-primary text-white border-primary' : 'hover:border-primary dark:border-gray-600'}`}>
                                            ₹{pa}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    placeholder="Or enter custom amount"
                                    className="input w-full mt-4"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method</label>
                                <div className="mt-2 space-y-3">
                                    <div className="p-3 border rounded-md dark:border-gray-600">Credit/Debit Card</div>
                                    <div className="p-3 border rounded-md dark:border-gray-600">UPI / QR Code</div>
                                    <div className="p-3 border rounded-md dark:border-gray-600">Bank Transfer</div>
                                </div>
                            </div>
                            <Button className="w-full text-lg" size="lg" variant="accent">Donate ₹{amount}</Button>
                            <p className="text-xs text-center text-gray-500">Donations are eligible for tax benefits under Section 80G.</p>
                        </CardContent>
                    </Card>

                    {/* Impact & Progress */}
                    <div className="space-y-8">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-3">Our Goal</h3>
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-gray-600 dark:text-gray-400">Raised: ₹{currentProgress.toLocaleString()}</span>
                                    <span className="text-gray-900 dark:text-white">Goal: ₹{goal.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-2">
                                    <motion.div
                                        className="bg-accent h-4 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercentage}%` }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    />
                                </div>
                                <p className="text-center mt-2 font-bold text-accent">{progressPercentage.toFixed(1)}% Funded</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Your Impact</h3>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <p className="text-3xl font-bold text-secondary">1,200+</p>
                                        <p className="text-sm text-gray-500">Students Helped</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-secondary">450+</p>
                                        <p className="text-sm text-gray-500">Sessions Funded</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
