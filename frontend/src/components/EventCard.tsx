'use client';

import React from 'react';
import Link from 'next/link';
import Card from './Card'; // Adjust this import based on your file structure

type Props = {
  event: any;
  isLoggedIn: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  onDelete?: (id: string) => void;
};

export default function EventCard({ event, isLoggedIn, showDelete, showEdit, onDelete }: Props) {
  return (
    <Card>
      <div className="flex gap-4 md:flex-row flex-col">
        {/* Image: consistent size */}
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full md:w-48 h-32 object-cover rounded-md"
          />
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#B42B2B] mb-1">{event.title}</h3>
            <p className="text-xs text-gray-500 mb-1">
              {new Date(event.date).toLocaleDateString()} @ {event.time} • {event.location}
            </p>
            <p className="text-sm text-gray-700 mb-1 line-clamp-2">
              {event.description}
            </p>
            <p className="text-xs text-gray-500">
              Attendees: {event.attendees?.length ?? 0} / {event.capacity ?? '∞'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-3">
            <Link href={`/events/${event._id}`}>
              <span className="text-sm text-blue-600 font-semibold hover:underline">
                Learn More →
              </span>
            </Link>

            <div className="flex gap-4">
              {showEdit && (
                <Link
                  href={`/events/${event._id}/edit`}
                  className="text-sm text-blue-600 font-semibold hover:underline"
                >
                  Edit
                </Link>
              )}
              {showDelete && (
                <button
                  onClick={() => onDelete?.(event._id)}
                  className="text-sm text-red-600 font-semibold hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
