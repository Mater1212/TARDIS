'use client';

import React, { useState } from 'react';
import Navbar from '../../components/NavBar';

export default function AddEventPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        image: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted Event:', formData);

        // Clear form
        setFormData({
            title: '',
            description: '',
            date: '',
            location: '',
            image: '',
        });
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
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                        required
                        className="w-full border p-2 rounded text-black"
                    />
                    <input
                        name="image"
                        value={formData.image}
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
