import React from 'react';
import Image from 'next/image';

export default function EventCard({ event }: { event: any }) {
    return (
        <div className="border p-4 rounded-xl shadow-md mb-6 max-w-2xl mx-auto bg-white">
            <div className="flex flex-col md:flex-row gap-4">
                <Image
                    src={event.image || '/event-placeholder.jpg'}
                    alt={event.title}
                    width={200}
                    height={150}
                    className="rounded-lg object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                    <p className="text-sm text-gray-600 mb-1">Hosted by: {event.host || 'UGA'}</p>
                    <p className="text-sm text-gray-500 mb-2">{event.date} at {event.location}</p>
                    <p className="text-gray-700 mb-2">{event.description}</p>
                    <button className="text-blue-600 font-semibold hover:underline">Learn More</button>
                </div>
            </div>
        </div>
    );
}
