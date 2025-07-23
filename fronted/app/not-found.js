'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Oops! The page you are looking for doesn&apos;t exist.</p>
      <Link href="/">
        <span className="text-blue-500 hover:underline">Go back to Home</span>
      </Link>
    </div>
  );
}
