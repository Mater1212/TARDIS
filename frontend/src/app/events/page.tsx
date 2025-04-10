'use client';

import React, { useEffect, useState } from 'react';
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
  attendees?: string[]; // assuming it's an array of user IDs
  createdAt?: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/events');
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const newEvents = [...events].sort((a, b) =>
    new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime()
  );

  const upcomingEvents = [...events].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const popularEvents = [...events].sort((a, b) =>
    (b.attendees?.length ?? 0) - (a.attendees?.length ?? 0)
  );

  return (
    <div>
      <Navbar />
      <main className="px-4 max-w-4xl mx-auto pb-16">
        <h1 className="text-3xl font-bold text-center mt-6 mb-10">Explore Events</h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-red-700 mb-4">POPULAR EVENTS</h2>
          {popularEvents.slice(0, 5).map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-red-700 mb-4">NEWLY ADDED</h2>
          {newEvents.slice(0, 5).map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-red-700 mb-4">COMING UP</h2>
          {upcomingEvents.slice(0, 5).map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </section>
      </main>
    </div>
  );
}
