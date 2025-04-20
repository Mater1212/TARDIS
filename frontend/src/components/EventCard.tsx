import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  event: {
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
  isLoggedIn?: boolean;
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = eventDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  const shortDescription =
    event.description.length > 150
      ? `${event.description.slice(0, 150).trim()}...`
      : event.description;

  return (
    <div className="border p-4 rounded-xl shadow-md mb-6 max-w-2xl mx-auto bg-white flex gap-4">
      <div className="w-40 h-40 relative flex-shrink-0">
        <Image
          src={event.imageUrl || '/event-placeholder.jpg'}
          alt={event.title}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-2xl font-bold text-black mb-1">{event.title}</h2>
          <p className="text-sm text-gray-600 mb-1">Hosted by: {event.host || 'UGA'}</p>
          <p className="text-sm text-gray-600 mb-2">
            {formattedDate} at {formattedTime} · {event.location}
          </p>
          <p className="text-black mb-2">{shortDescription}</p>
        </div>

        <Link href={`/events/${event._id}`}>
          <button className="bg-red-700 text-white text-sm font-medium px-4 py-1 rounded-full hover:bg-red-800 transition w-fit mt-2">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
}
