'use client';

import React from 'react';
import Navbar from '../components/NavBar';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <section className="flex flex-col items-center justify-center min-h-screen bg-[#B42B2B] text-white px-4">
        <h1 className="text-5xl font-extrabold text-center mb-2">UGA EVENT HUB</h1>
        <p className="text-lg font-medium text-center mb-8">YOUR ALL-IN-ONE EVENT ORGANIZER AT UGA</p>

        <div className="rounded-full overflow-hidden shadow-lg mb-8 border-4 border-white">
          <Image
            src="/UGA_Arch.jpg"
            alt="UGA Arch"
            width={300}
            height={300}
            className="object-cover"
          />
        </div>

        <Link href="/events">
          <div className="bg-white text-[#B42B2B] text-center font-bold px-10 py-4 rounded-2xl shadow-lg flex items-center gap-2 hover:bg-gray-100">
            DISCOVER AND ADD EVENTS NOW!
            <span className="text-2xl">→</span>
          </div>
        </Link>
      </section>
    </div>
  );
}
