'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="flex justify-between items-center p-4 shadow-md bg-white mb-4 sticky top-0 z-50">
            <Link href="/" className="text-xl font-bold text-black hover:underline">
                UGA EVENT HUB
            </Link>

            <div className="flex gap-4 items-center">
                {user ? (
                    <>
                        <span className="text-sm">Hi, {user.name || user.email}</span>
                        <Link href="/add-event" className="text-blue-600">Add Event</Link>
                        <button onClick={logout} className="text-red-500">Logout</button>
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
