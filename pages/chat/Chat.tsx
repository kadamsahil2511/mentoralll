
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { users, chatMessages } from '../../data/mockData';
import { Search, Send, Paperclip, Phone, Video } from 'lucide-react';

export const Chat: React.FC = () => {
    const { user } = useAuth();
    const [selectedChat, setSelectedChat] = useState<string | null>('senior1'); // Default to first contact
    
    const myContacts = users.filter(u => u.id !== user?.id);
    const currentContact = users.find(u => u.id === selectedChat);
    const messages = chatMessages.filter(
        msg => (msg.senderId === user?.id && msg.receiverId === selectedChat) ||
               (msg.senderId === selectedChat && msg.receiverId === user?.id)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    return (
        <div className="h-[calc(100vh-4rem)] max-w-7xl mx-auto p-4">
            <div className="grid grid-cols-12 gap-4 h-full">
                {/* Contact List */}
                <div className="col-span-4 h-full">
                    <Card className="flex flex-col h-full">
                        <CardHeader>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input type="text" placeholder="Search contacts..." className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"/>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow overflow-y-auto">
                            <div className="space-y-2">
                                {myContacts.map(contact => (
                                    <div
                                        key={contact.id}
                                        onClick={() => setSelectedChat(contact.id)}
                                        className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition ${selectedChat === contact.id ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                    >
                                        <div className="relative">
                                            <img src={contact.profilePicture} alt={contact.fullName} className="w-12 h-12 rounded-full" />
                                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{contact.fullName}</p>
                                            <p className="text-sm text-gray-500 truncate">Last message here...</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Chat Window */}
                <div className="col-span-8 h-full">
                    {currentContact ? (
                        <Card className="flex flex-col h-full">
                            <CardHeader className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img src={currentContact.profilePicture} alt={currentContact.fullName} className="w-10 h-10 rounded-full"/>
                                    <div>
                                        <p className="font-bold">{currentContact.fullName}</p>
                                        <p className="text-sm text-green-500">Online</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="px-2"><Phone size={20}/></Button>
                                    <Button variant="ghost" size="sm" className="px-2"><Video size={20}/></Button>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow overflow-y-auto bg-gray-50 dark:bg-gray-900/50 p-4 space-y-4">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs md:max-w-md p-3 rounded-xl ${msg.senderId === user?.id ? 'bg-primary text-white' : 'bg-white dark:bg-gray-700'}`}>
                                            <p>{msg.text}</p>
                                            <p className={`text-xs mt-1 ${msg.senderId === user?.id ? 'text-blue-200' : 'text-gray-500'}`}>{new Date(msg.timestamp).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                            <div className="p-4 border-t dark:border-gray-700 flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="px-2"><Paperclip size={20}/></Button>
                                <input type="text" placeholder="Type a message..." className="flex-grow py-2 px-4 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none"/>
                                <Button variant="primary" className="rounded-full p-3 h-auto"><Send size={20}/></Button>
                            </div>
                        </Card>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">Select a chat to start messaging</div>
                    )}
                </div>
            </div>
        </div>
    );
};
