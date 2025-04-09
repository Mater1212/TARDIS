import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function EventForm() {
    const { user } = useContext(AuthContext);
    const [form, setForm] = useState({ title: '', date: '', location: '', description: '', image: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ ...form, email: user.email });
        setForm({ title: '', date: '', location: '', description: '', image: '' });
    };

    if (!user || !user.email.endsWith('@uga.edu')) {
        return <p className="text-red-600">Only UGA students can create events.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold">Add Event</h2>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Event Title" required className="border p-2 w-full" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="border p-2 w-full" />
            <input type="date" name="date" value={form.date} onChange={handleChange} required className="border p-2 w-full" />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required className="border p-2 w-full" />
            <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (optional)" className="border p-2 w-full" />
            <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded">Submit</button>
        </form>
    );
}