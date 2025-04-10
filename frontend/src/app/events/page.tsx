'use client';

import React from 'react';
import Navbar from '@/components/NavBar';
import EventCard from '@/components/EventCard';

const dummyEvents = [
    {
        id: 1,
        title: 'UGA Research Clinic',
        description: 'A great starting point for research help!',
        image: '/event1.png',
        host: 'UGA',
        date: 'April 20, 2025',
        location: 'Science Library',
        category: 'top',
    },
    {
        id: 2,
        title: 'Art Walk Athens',
        description: 'Explore local art galleries downtown with student guides.',
        image: '/event2.png',
        host: 'Joe Smith',
        date: 'April 25, 2025',
        location: 'Downtown Athens',
        category: 'new',
    },
    {
        id: 3,
        title: 'Nature Walk Athens',
        description: 'Explore local nature trails downtown with student guides.',
        image: '/event3.png',
        host: 'Joe Smith',
        date: 'April 25, 2025',
        location: 'Downtown Athens',
        category: 'upcoming',
    },
    {
        id: 4,
        title: 'Campus Yoga',
        description: 'Relax and stretch outdoors.',
        image: '/yoga.png',
        host: 'UGA Wellness',
        date: 'April 20, 2025',
        location: 'Myers Quad',
        category: 'new',
    },
    {
        id: 5,
        title: 'Hackathon 2025',
        description: '24-hour coding challenge!',
        image: '/UGA Hack.png',
        host: 'UGA CS',
        date: 'April 27, 2025',
        location: 'Driftmier',
        category: 'upcoming',
    }, {
        id: 6,
        title: 'Iron Man 5K',
        description: 'Come out and run with us!',
        image: '/5K.png',
        host: 'UGA Student Recreation',
        date: 'April 30, 2025',
        location: 'Ramsey',
        category: 'upcoming',
    }
];

export default function EventsPage() {
    return (
        <div>
            <Navbar />
            <main className="px-4 max-w-4xl mx-auto pb-16">
                <h1 className="text-3xl font-bold text-center mt-6 mb-10">Explore Events</h1>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-red-700 mb-4">TOP EVENTS</h2>
                    {dummyEvents
                        .filter(e => e.category === 'top')
                        .map(event => <EventCard key={event.id} event={event} />)}
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-red-700 mb-4">NEWLY ADDED</h2>
                    {dummyEvents
                        .filter(e => e.category === 'new')
                        .map(event => <EventCard key={event.id} event={event} />)}
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-red-700 mb-4">COMING UP</h2>
                    {dummyEvents
                        .filter(e => e.category === 'upcoming')
                        .map(event => <EventCard key={event.id} event={event} />)}
                </section>
            </main>
        </div>
    );
}
