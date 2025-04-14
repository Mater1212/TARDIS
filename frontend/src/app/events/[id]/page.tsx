'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-red-700 mb-2">{event.title}</h1>
      <p className="text-sm text-gray-600 mb-2">
        {new Date(event.date).toLocaleDateString()} @ {event.time}
      </p>
      <p className="text-sm text-gray-600 mb-2">Location: {event.location}</p>
      <p className="text-sm text-gray-600 mb-4">Hosted by: {event.host || 'UGA'}</p>

      <img
        src={event.imageUrl || '/event-placeholder.jpg'}
        alt={event.title}
        className="w-full max-w-md rounded-md mb-6"
      />

      <p className="text-black mb-4">{event.description}</p>

      <div className="flex gap-4">
        <button className="border px-4 py-2 rounded hover:bg-gray-100">Message the Host</button>
        <button className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800">RSVP</button>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Attendees: {event.attendees?.length ?? 0} / {event.capacity ?? '∞'}
      </div>
    </div>
  );
}

