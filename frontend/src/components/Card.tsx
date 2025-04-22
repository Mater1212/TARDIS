'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white max-w-3xl mx-auto mb-6">
      {children}
    </div>
  );
}