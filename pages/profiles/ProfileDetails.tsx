import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

export const ProfileDetails: React.FC = () => {
    const { user } = useAuth();
    const [employeeData, setEmployeeData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            const { data, error } = await supabase
                .from('employees')
                .select('*')
                .eq('id', user.id)
                .single();
            if (data) setEmployeeData(data);
        };
        fetchData();
    }, [user]);

    if (!user) return <p className="text-center mt-10">Please register or login first.</p>;
    if (!employeeData) return <p className="text-center mt-10">Loading profile...</p>;

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Details</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>Full Name:</strong> {employeeData.fullName}</p>
                    <p><strong>Email:</strong> {employeeData.email}</p>
                    <p><strong>Phone:</strong> {employeeData.phone}</p>
                    <p><strong>Company:</strong> {employeeData.companyName}</p>
                    <p><strong>Working Place:</strong> {employeeData.workingPlace}</p>
                    <p><strong>Current Residence:</strong> {employeeData.currentResidence}</p>
                </CardContent>
            </Card>
        </div>
    );
};
