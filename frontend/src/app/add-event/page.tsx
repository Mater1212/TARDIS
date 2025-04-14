"use client";

import React, { useState } from 'react';
import Navbar from '../../components/NavBar';

export default function AddEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      capacity: parseInt(formData.capacity),
    };

    try {
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to submit event');

      const result = await res.json();
      console.log('Submitted Event:', result);

      alert('Event submitted successfully!');

      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        capacity: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('There was a problem submitting the event.');
    }
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-xl mx-auto bg-white p-6 mt-10 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-black mb-4 text-center">Add a New Event</h1>
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
            className="w-full border p-2 rounded text-black"
          />
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded text-black"
          />
          <input
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded text-black"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full border p-2 rounded text-black"
          />
          <input
            name="capacity"
            type="number"
            min={1}
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Capacity"
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