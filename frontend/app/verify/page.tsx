'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`http://localhost:5000/verify/${token}`);
        if (res.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };

    if (token) {
      verify();
    } else {
      setStatus('error');
    }
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      {status === 'loading' && <p className="text-gray-700">Verifying your email...</p>}

      {status === 'success' && (
        <div>
          <p className="text-green-600 text-xl font-bold mb-4">✅ Your account has been verified!</p>
          <Link href="/login">
            <button className="bg-red-700 text-white px-6 py-2 rounded font-bold hover:bg-red-800">
              Go to Log In
            </button>
          </Link>
        </div>
      )}

      {status === 'error' && (
        <p className="text-red-600 font-bold">❌ Invalid or expired verification link.</p>
      )}
    </div>
  );
}