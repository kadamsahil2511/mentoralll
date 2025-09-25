
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { counsellingSlots } from '../../data/mockData';
import { format, eachDayOfInterval, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

export const CounsellingBooking: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState<typeof counsellingSlots[0] | null>(null);

    const weekDays = eachDayOfInterval({
        start: startOfWeek(currentDate),
        end: endOfWeek(currentDate)
    });

    const slotsForDay = (day: Date) => counsellingSlots.filter(slot => isSameDay(slot.startTime, day));

    const nextWeek = () => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 7)));
    const prevWeek = () => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 7)));

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Book a Counselling Session</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Your mental well-being is our priority. All sessions are confidential.</p>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/50 border-l-4 border-warning text-warning p-4 rounded-md mb-8 flex gap-3">
                <Info size={24} className="flex-shrink-0" />
                <div>
                    <h3 className="font-bold">Privacy Notice</h3>
                    <p className="text-sm">Your privacy is protected. Anonymous booking is available. If you're in distress, please contact the 24/7 helpline at +91-XXX-XXXX-XXX.</p>
                </div>
            </div>

            <Card>
                <CardHeader className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Available Time Slots</h2>
                    <div className="flex items-center gap-4">
                        <Button onClick={prevWeek} variant="ghost" size="sm" className="p-2"><ChevronLeft size={20}/></Button>
                        <span className="font-medium">{format(startOfWeek(currentDate), 'MMM d')} - {format(endOfWeek(currentDate), 'MMM d, yyyy')}</span>
                        <Button onClick={nextWeek} variant="ghost" size="sm" className="p-2"><ChevronRight size={20}/></Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-400 border-b pb-2 mb-2">
                        {weekDays.map(day => <div key={day.toString()}>{format(day, 'E')}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {weekDays.map(day => (
                            <div key={day.toString()} className="border rounded-lg p-2 dark:border-gray-700 h-64 overflow-y-auto">
                                <p className="font-bold text-center mb-2">{format(day, 'd')}</p>
                                <div className="space-y-2">
                                    {slotsForDay(day).map(slot => (
                                        <button 
                                            key={slot.id}
                                            onClick={() => !slot.isBooked && setSelectedSlot(slot)}
                                            disabled={slot.isBooked}
                                            className={`w-full p-2 text-xs rounded-md text-left transition ${
                                                slot.isBooked 
                                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                                                    : 'bg-primary text-white hover:bg-blue-600'
                                            } ${selectedSlot?.id === slot.id ? 'ring-2 ring-secondary' : ''}`}
                                        >
                                            <p className="font-semibold">{format(slot.startTime, 'p')}</p>
                                            <p>{slot.counselorName}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedSlot && (
                        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div>
                                <p className="font-semibold">You've selected:</p>
                                <p>
                                    <span className="font-bold">{format(selectedSlot.startTime, 'eeee, MMMM d')}</span> at{' '}
                                    <span className="font-bold">{format(selectedSlot.startTime, 'p')}</span> with{' '}
                                    <span className="font-bold">{selectedSlot.counselorName}</span> ({selectedSlot.counselorSpecialty}).
                                </p>
                            </div>
                            <Button>Confirm Booking</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
