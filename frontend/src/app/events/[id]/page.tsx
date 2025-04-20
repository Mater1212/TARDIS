'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/NavBar';

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error('Failed to fetch event:', err);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p className="text-center mt-20">Loading event...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => window.location.href = '/events'}
          className="mb-6 border border-black text-black px-4 py-2 rounded-md hover:bg-gray-100"
        >
          ← Back to Events
        </button>

        <div className="flex flex-col md:flex-row items-start gap-10 mt-4">
          <img
            src={event.imageUrl || '/event-placeholder.jpg'}
            alt={event.title}
            className="w-[300px] h-[300px] object-cover rounded-md shadow-md"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-red-700 mb-2">{event.title}</h1>
            <p><span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
            <p><span className="font-semibold">Time:</span> {event.time}</p>
            <p><span className="font-semibold">Location:</span> {event.location}</p>
            <p><span className="font-semibold">Hosted by:</span> {event.host || 'UGA'}</p>

            <div className="flex gap-4 my-4">
              <button className="border border-black text-black px-4 py-2 rounded hover:bg-gray-100">
                Message the Host
              </button>
              <button
                onClick={() => {
                  const joined = JSON.parse(localStorage.getItem('joinedEvents') || '[]');
                  if (!joined.includes(event._id)) {
                    joined.push(event._id);
                    localStorage.setItem('joinedEvents', JSON.stringify(joined));
                    alert('RSVP confirmed!');
                  } else {
                    alert('You already RSVP’d to this event.');
                  }
                }}
                className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800"
              >
                RSVP
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Attendees: {event.attendees?.length ?? 0} / {event.capacity ?? '35'}
            </p>
          </div>
        </div>

        {/* Divider line */}
        <hr className="my-8 border-t border-gray-300" />

        {/* Full description below divider */}
        <p className="text-black whitespace-pre-line">{event.description}</p>
      </div>
    </>
  );
}
