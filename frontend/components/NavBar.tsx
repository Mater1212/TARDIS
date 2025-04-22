'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white mb-4 sticky top-0 z-50">
      {/* Logo / Home Link */}
      <Link href="/" className="text-xl font-bold text-black hover:underline">
        UGA EVENT HUB
      </Link>

      {/* Right-side nav options */}
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm text-black">Hi, {user.firstName}!</span>
            <Link href="/add-event" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Add Event</Link>
            <Link href="/profile" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Profile</Link>
            <button onClick={logout} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">Logout</button>
          </>
        ) : (
          <>
            <Link href="/signup" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Sign Up</Link>
            <Link href="/login" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Log In</Link>
          </>
        )}
      </div>
    </nav>
  );
}
