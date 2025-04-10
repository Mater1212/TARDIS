'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/NavBar';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('New user registered:', formData);
        localStorage.setItem('userName', formData.fullName);
        router.push('/auth-view');
    };

    return (
        <div>
            <Navbar />
            <main className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-xl">
                <h1 className="text-2xl font-bold mb-6 text-black text-center">Create an Account</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className="w-full border p-2 rounded text-black"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email (use @uga.edu)"
                        required
                        className="w-full border p-2 rounded text-black"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="w-full border p-2 rounded text-black"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#B42B2B] text-white py-2 rounded font-bold hover:bg-[#9e1e1e]"
                    >
                        Register
                    </button>
                </form>
            </main>
        </div>
    );
}
