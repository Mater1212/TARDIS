'use client';

import React, { useEffect, useState } from 'react';
import EventCard from '@/components/EventCard';
import Navbar from '@/components/NavBar';


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
};

export default function AuthenticatedEventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedTab, setSelectedTab] = useState<'popular' | 'new' | 'upcoming'>('popular');
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (!name) {
      window.location.href = '/login'; // redirect if not logged in
      return;
    }

    setUserName(name.split(' ')[0]);

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

  const getSortedEvents = () => {
    if (selectedTab === 'new') {
      return [...events].sort((a, b) =>
        new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime()
      );
    } else if (selectedTab === 'upcoming') {
      return [...events].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else {
      return [...events].sort(
        (a, b) => (b.attendees?.length ?? 0) - (a.attendees?.length ?? 0)
      );
    }
  };

  const sortedEvents = getSortedEvents();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex max-w-7xl mx-auto px-6 py-10 gap-8">
        {/* Sidebar Filters */}
        <aside className="sticky top-1/4 h-fit self-start pr-6 border-r border-gray-300">
          <div className="flex flex-col gap-4 items-start">
            {['popular', 'new', 'upcoming'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab as any)}
                className={`px-4 py-2 rounded-full border w-40 text-left transition ${
                  selectedTab === tab
                    ? 'bg-red-700 text-white font-semibold'
                    : 'bg-white text-red-700 border-red-700 hover:bg-red-100'
                }`}
              >
                {tab === 'popular' && 'TOP EVENTS'}
                {tab === 'new' && 'NEWLY ADDED'}
                {tab === 'upcoming' && 'COMING UP'}
              </button>
            ))}
          </div>
        </aside>

        {/* Event Feed */}
        <section className="flex-1">
          <h2 className="text-3xl font-bold mb-6 capitalize">
            {selectedTab === 'popular' && 'Top Events'}
            {selectedTab === 'new' && 'Newly Added'}
            {selectedTab === 'upcoming' && 'Coming Up'}
          </h2>

          <div className="text-right mb-6">
            <a
              href="/add-event"
              className="bg-red-700 text-white px-6 py-2 rounded-md font-bold hover:bg-red-800"
            >
              Add New Event
            </a>
          </div>

          {sortedEvents.map(event => (
            <EventCard key={event._id} event={event} isLoggedIn={true} />
          ))}
        </section>
      </main>
    </div>
  );
}
