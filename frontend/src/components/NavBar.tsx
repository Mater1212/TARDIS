'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name.split(' ')[0]);
    } else {
      setUserName(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  const isLoggedIn = !!userName;

  const buttonStyle = "bg-white border px-4 py-1 rounded font-semibold";

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white mb-4 sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-black hover:underline">
        UGA EVENT HUB
      </Link>

      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <span className="text-sm text-black">Hi, {userName}!</span>
            <Link href="/profile">
              <button className={`${buttonStyle} border-black-600 text-black-600 hover:bg-gray-100`}>
                Profile
              </button>
            </Link>
            <Link href="/inbox">
              <button className={`${buttonStyle} border-black-600 text-black-600 hover:bg-gray-100`}>
                Inbox
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className={`${buttonStyle} border-black-600 text-black-600 hover:bg-gray-100`}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/signup">
              <button className={`${buttonStyle} border-blue-600 text-blue-600 hover:bg-blue-100`}>
                Sign Up
              </button>
            </Link>
            <Link href="/login">
              <button className={`${buttonStyle} border-blue-600 text-blue-600 hover:bg-blue-100`}>
                Log In
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
