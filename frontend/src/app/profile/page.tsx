"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import Navbar from '@/components/NavBar';
import EventCard from '@/components/EventCard';

type EventType = {
    _id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    imageUrl?: string;
    attendees?: string[];
    createdAt?: string;
    host?: string;
    capacity?: number;
};

export default function ProfilePage() {
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [myEvents, setMyEvents] = useState<EventType[]>([]);
    const [joinedEvents, setJoinedEvents] = useState<EventType[]>([]);
    const [activeTab, setActiveTab] = useState<'profile' | 'myEvents' | 'joined'>('profile');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    // Handle deleting user-owned events
    const handleDelete = async (eventId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this event?');
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id }),
            });

            const data = await res.json();
            if (!res.ok) return alert(data.error || 'Failed to delete event');

            setMyEvents(prev => prev.filter(e => e._id !== eventId));
        } catch (err) {
            console.error('Delete error:', err);
            alert('Server error while deleting event');
        }
    };


    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/events');
                const allEvents = await res.json();

                const mine = allEvents.filter((event: any) =>
                    event.createdBy === user._id || event.createdBy?._id === user._id
                );

                setMyEvents(mine);
            } catch (err) {
                console.error('Failed to fetch user events:', err);
            }
        };

        if (user?._id) fetchMyEvents();
    }, [user?._id]);


    useEffect(() => {
        const fetchJoinedEvents = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/events');
                const allEvents = await res.json();

                const joined = allEvents.filter((event: any) =>
                    event.attendees?.some((attendee: any) =>
                        typeof attendee === 'object'
                            ? attendee._id === user._id
                            : attendee === user._id
                    )
                );

                setJoinedEvents(joined);
            } catch (err) {
                console.error('Failed to fetch joined events:', err);
            }
        };

        if (user?._id) fetchJoinedEvents();
    }, [user?._id]);


    if (!user) {
        return <p className="text-center mt-10">Loading user info...</p>;
    }

    return (
        <div>
            <Navbar />

            <div className="flex max-w-7xl mx-auto mt-8 p-6">
                {/* Sidebar */}
                <aside className="w-64 pr-6 border-r space-y-4">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className="w-full py-2 px-4 text-left bg-gray-100 hover:bg-gray-200 border rounded transition"
                    >
                        PROFILE <span className="float-right">{'>'}</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('myEvents')}
                        className="w-full py-2 px-4 text-left bg-gray-100 hover:bg-gray-200 border rounded transition"
                    >
                        MY EVENTS <span className="float-right">{'>'}</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('joined')}
                        className="w-full py-2 px-4 text-left bg-gray-100 hover:bg-gray-200 border rounded transition"
                    >
                        JOINED EVENTS <span className="float-right">{'>'}</span>
                    </button>
                    <button
                        onClick={() => window.location.href = '/events'}
                        className="w-full py-2 px-4 text-center bg-gray-100 hover:bg-gray-200 border rounded transition"
                    >
                        <span className="float-left">{'<'}</span> Back to Events
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 px-10">
                    {activeTab === 'profile' && (
                        <>
                            <h1 className="text-3xl font-bold text-[#B42B2B] mb-6">ACCOUNT MANAGEMENT</h1>

                            {/* Profile Image */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="w-40 h-40 rounded-full bg-gray-100 border flex items-center justify-center overflow-hidden">
                                    {profileImage ? (
                                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    )}
                                </div>
                                <label className="mt-4 cursor-pointer text-sm bg-gray-200 py-1 px-3 rounded hover:bg-gray-300">
                                    Upload New Photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs mt-1 text-gray-500">At least 200x200px. JPG or PNG is allowed.</p>
                            </div>

                            {/* Personal Info */}
                            <div className="border-t pt-6 space-y-4">
                                <h2 className="text-lg font-bold text-[#B42B2B] uppercase">Personal Information</h2>
                                <p className="text-black"><strong>Full Name:</strong> {user.fullName || '—'}</p>
                                <p className="text-black"><strong>Phone Number:</strong> {user.phone || '—'}</p>
                                <p className="text-black"><strong>Email:</strong> {user.email || '—'}</p>

                                <button
                                    onClick={logout}
                                    className="mt-4 bg-[#B42B2B] text-white px-6 py-2 rounded-full hover:bg-red-800"
                                >
                                    Log Out
                                </button>
                            </div>
                        </>
                    )}

                    {activeTab === 'myEvents' && (
                        <div className="space-y-6 mt-6">
                            <h2 className="text-2xl font-bold text-[#B42B2B]">My Events</h2>
                            {myEvents.length === 0 ? (
                                <p>No events created yet.</p>
                            ) : (
                                myEvents.map(event => (
                                    <EventCard
                                        key={event._id}
                                        event={event}
                                        isLoggedIn={true}
                                        showDelete={true}
                                        onDelete={handleDelete}
                                        showEdit={true}
                                    />
                                ))

                            )}
                        </div>
                    )}

                    {activeTab === 'joined' && (
                        <div className="space-y-6 mt-6">
                            <h2 className="text-2xl font-bold text-[#B42B2B]">Joined Events</h2>
                            {joinedEvents.length === 0 ? (
                                <p>You haven’t RSVP’d to any events yet.</p>
                            ) : (
                                joinedEvents.map(event => (
                                    <EventCard key={event._id} event={event} isLoggedIn={true} />
                                ))
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
