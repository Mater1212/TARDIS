'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/NavBar';
import { AuthContext } from '@/contexts/AuthContext';

export default function AddEventPage() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    imageUrl: '',
    capacity: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user || !user.email) {
      setError('You must be logged in to create an event.');
      return;
    }

    const payload = {
      ...formData,
      capacity: parseInt(formData.capacity),
      createdBy: user._id,
    };

    try {
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        router.push('/events');
      }
    } catch (err) {
      console.error(err);
      setError('Server error while submitting event');
    }
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
        <button
          onClick={() => window.location.href = '/events'}
          className="mb-6 border border-black text-black px-4 py-2 rounded-md hover:bg-gray-100"
        >
          ← Back to Events
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center">Add a New Event</h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            required
            className="w-full border p-2 rounded text-black"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            rows={6}
            style={{ whiteSpace: 'pre-line' }}
            className="w-full border p-2 rounded text-black resize-none"
          />
          <div className="flex gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="flex-1 border p-2 rounded text-black"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="flex-1 border p-2 rounded text-black"
            />
          </div>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full border p-2 rounded text-black"
          />
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="w-full border p-2 rounded text-black"
          />
          <input
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Capacity"
            required
            className="w-full border p-2 rounded text-black"
          />
          <button
            type="submit"
            className="w-full bg-[#B42B2B] text-white font-bold py-2 rounded hover:bg-[#9e1e1e]"
          >
            Submit Event
          </button>
        </form>
      </main>
    </div>
  );
}
