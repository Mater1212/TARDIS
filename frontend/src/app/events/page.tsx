'use client';

import React, { useEffect, useState } from 'react';
import EventCard from '@/components/EventCard';
import Navbar from '@/components/NavBar';
import Link from 'next/link';

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

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedTab, setSelectedTab] = useState<'popular' | 'new' | 'upcoming'>('popular');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('');

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

    const name = localStorage.getItem('userName') || '';
    setUserName(name.split(' ')[0]);
  }, []);

  const getSortedEvents = () => {
    if (selectedTab === 'new') {
      return [...events].sort(
        (a, b) => new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime()
      );
    } else if (selectedTab === 'upcoming') {
      return [...events].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
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
            <button
              onClick={() => setSelectedTab('popular')}
              className={`px-4 py-2 rounded-full border w-40 text-left transition ${selectedTab === 'popular' ? 'bg-red-700 text-white font-semibold' : 'bg-white text-red-700 border-red-700 hover:bg-red-100'
                }`}
            >
              TOP EVENTS
            </button>
            <button
              onClick={() => setSelectedTab('new')}
              className={`px-4 py-2 rounded-full border w-40 text-left transition ${selectedTab === 'new' ? 'bg-red-700 text-white font-semibold' : 'bg-white text-red-700 border-red-700 hover:bg-red-100'
                }`}
            >
              NEWLY ADDED
            </button>
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`px-4 py-2 rounded-full border w-40 text-left transition ${selectedTab === 'upcoming' ? 'bg-red-700 text-white font-semibold' : 'bg-white text-red-700 border-red-700 hover:bg-red-100'
                }`}
            >
              COMING UP
            </button>
          </div>
        </aside>

        {/* Event Feed */}
        <section className="flex-1">
          <h2 className="text-3xl font-bold mb-6">
            {selectedTab === 'popular' && 'Top Events'}
            {selectedTab === 'new' && 'Newly Added'}
            {selectedTab === 'upcoming' && 'Coming Up'}
          </h2>

          {sortedEvents.map(event => (
            <EventCard key={event._id} event={event} isLoggedIn={isLoggedIn} />
          ))}
        </section>
      </main>
    </div>
  );
}