'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import Navbar from '@/components/NavBar';

export default function EditEventPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useContext(AuthContext);

    const [originalData, setOriginalData] = useState<any>(null);
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
    const [loading, setLoading] = useState(true);

    // Fetch event
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/events/${id}`);
                const data = await res.json();

                if (data.createdBy?._id !== user?._id && data.createdBy !== user?._id) {
                    setError('You are not authorized to edit this event.');
                } else {
                    const clean = {
                        title: data.title,
                        description: data.description,
                        date: data.date?.slice(0, 10),
                        time: data.time,
                        location: data.location,
                        imageUrl: data.imageUrl,
                        capacity: String(data.capacity),
                    };

                    setFormData(clean);
                    setOriginalData(clean);
                }
            } catch (err) {
                setError('Failed to load event.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) fetchEvent();
    }, [id, user?._id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        if (originalData) {
            setFormData(originalData);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`http://localhost:5000/api/events/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    capacity: parseInt(formData.capacity),
                    userId: user._id,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Failed to update event.');
            } else {
                router.push(`/events/${id}`);
            }
        } catch (err) {
            console.error(err);
            setError('Server error during update.');
        }
    };

    if (loading) return <p className="text-center mt-10">Loading event data...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div>
            <Navbar />
            <main className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
                <button
                    onClick={() => router.push(`/events/${id}`)}
                    className="mb-6 border border-black text-black px-4 py-2 rounded-md hover:bg-gray-100"
                >
                    ← Back to Event
                </button>
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Event</h1>
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
                        rows={5}
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

                    <div className="flex justify-between gap-4 pt-2">
                        <button
                            type="submit"
                            className="flex-1 bg-[#B42B2B] text-white font-bold py-2 rounded hover:bg-[#9e1e1e]"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex-1 border border-gray-400 text-gray-700 py-2 rounded hover:bg-gray-100"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
