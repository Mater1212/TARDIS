'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const name = localStorage.getItem('userName');
        if (name) {
            setUserName(name.split(' ')[0]);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userName');
        window.location.href = '/';
    };

    const isLoggedIn = !!userName;

    return (
        <nav className="flex justify-between items-center p-4 shadow-md bg-white mb-4 sticky top-0 z-50">
            <Link href="/" className="text-xl font-bold text-black hover:underline">
                UGA EVENT HUB
            </Link>

            <div className="flex gap-4 items-center">
                {isLoggedIn ? (
                    <>
                        <span className="text-sm">Hi, {userName}</span>
                        <Link href="/add-event" className="text-blue-600">Add Event</Link>
                        <button onClick={handleLogout} className="text-red-500">Logout</button>
                    </>
                ) : (
                    <>
                        <Link href="/signup" className="text-blue-600">Sign Up</Link>
                        <Link href="/auth-view" className="text-blue-600">Log In</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
