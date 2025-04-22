'use client';

import Link from 'next/link';
import Navbar from '../../components/NavBar';

export default function CheckEmailPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-xl text-black text-center">
        <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
        <p className="mb-4">
          We've sent a verification link to your <span className="font-semibold">@uga.edu</span> email address.
          Please check your inbox and click the link to verify your account.
        </p>
        <p className="text-sm text-gray-600">
          Didn’t get the email? Try checking your spam folder or{" "}
          <Link href="/signup" className="text-blue-600 underline">sign up again</Link>.
        </p>
      </main>
    </div>
  );
}
