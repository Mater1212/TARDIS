'use client';

import { useEffect, useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/NavBar';
import { AuthContext } from '@/contexts/AuthContext';

export default function EventDetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState<any>(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        const data = await res.json();
        setEvent(data);

        // RSVP check
        if (user?._id && data.attendees) {
          const joined = data.attendees.some((attendee: any) =>
            typeof attendee === 'object'
              ? attendee._id === user._id
              : attendee === user._id
          );
          setHasJoined(joined);
        }

        if (data.attendees?.length >= data.capacity) {
          setIsFull(true);
        }
      } catch (err) {
        console.error('Failed to fetch event:', err);
      }
    };

    fetchEvent();
  }, [id, user?._id]);

  const handleRSVP = async () => {
    if (!user || !user._id) {
      alert('You must be logged in to RSVP.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/events/${event._id}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id }),
      });

      const updated = await res.json();

      if (!res.ok) throw new Error(updated.error || 'RSVP failed');

      setEvent((prev: any) => ({ ...prev, attendees: updated.attendees }));
      setHasJoined(true);
      setIsFull(updated.attendees.length >= event.capacity);
      alert('RSVP confirmed!');
    } catch (err) {
      console.error('RSVP error:', err);
      alert('Something went wrong while RSVP-ing.');
    }
  };

  const handleCancelRSVP = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${event._id}/rsvp/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id }),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || 'Cancel RSVP failed');

      setEvent((prev: any) => ({ ...prev, attendees: updated.attendees }));
      setHasJoined(false);
      setIsFull(updated.attendees.length >= event.capacity);
      alert('RSVP cancelled.');
    } catch (err) {
      console.error('Cancel RSVP error:', err);
      alert('Something went wrong while cancelling RSVP.');
    }
  };

  if (!event) return <p className="text-center mt-20">Loading event...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-red-700 mb-2">{event.title}</h1>
      <p className="text-sm text-gray-600 mb-2">
        {new Date(event.date).toLocaleDateString()} @ {event.time}
      </p>
      <p className="text-sm text-gray-600 mb-2">Location: {event.location}</p>
      <p className="text-sm text-gray-600 mb-4">
        Hosted by:{' '}
        {event.createdBy
          ? `${event.createdBy.firstName} ${event.createdBy.lastName}`
          : 'UGA'}
      </p>

      <img
        src={event.imageUrl || '/event-placeholder.jpg'}
        alt={event.title}
        className="w-full max-w-md rounded-md mb-6"
      />

      <p className="text-black mb-4">{event.description}</p>

      <div className="flex gap-4">
        {!hasJoined && !isFull && (
          <button
            onClick={handleRSVP}
            className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800"
          >
            RSVP
          </button>
        )}

        {isFull && !hasJoined && (
          <p className="text-yellow-600 text-sm font-medium">
            This event is full. RSVP is closed.
          </p>
        )}

        {hasJoined && (
          <button
            onClick={handleCancelRSVP}
            className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel RSVP
          </button>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Attendees: {event.attendees?.length ?? 0} / {event.capacity ?? '∞'}
      </div>
    </div>
  );
}
