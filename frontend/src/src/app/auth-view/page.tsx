'use client';

import React, { useState } from 'react';
import Navbar from '../../components/NavBar';
import EventCard from '../../components/EventCard';

const dummyEvents = [
    {
        id: 1,
        title: 'Campus Yoga',
        description: 'Relax and stretch outdoors.',
        image: '/event1.png',
        host: 'UGA Wellness',
        date: 'April 20, 2025',
        location: 'Myers Quad',
    },
    {
        id: 2,
        title: 'Hackathon 2025',
        description: '24-hour coding challenge!',
        image: '/event2.png',
        host: 'UGA CS',
        date: 'April 27, 2025',
        location: 'Driftmier',
    },
];

export default function AuthenticatedView() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // 🔐 Toggle manually for demo

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div>
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-10">
                {isLoggedIn ? (
                    <>
                        <h1 className="text-3xl font-bold text-center mb-6">Welcome, Kevin!</h1>

                        <div className="text-center mb-6">
                            <a href="/add-event" className="bg-[#B42B2B] text-white px-6 py-2 rounded-md font-bold hover:bg-[#9e1e1e]">
                                Add New Event
                            </a>
                        </div>

                        {dummyEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}

                        <div className="text-center mt-8">
                            <button
                                onClick={handleLogout}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">You are logged out.</h2>
                        <a href="/auth-view" className="text-blue-600 underline">
                            Go to Login
                        </a>
                    </div>
                )}
            </main>
        </div>
    );
}
