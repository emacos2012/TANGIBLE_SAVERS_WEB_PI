'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';

export default function LoginPage() {
  const { loginWithPi, loading, error } = useAuth();
  const [loginAttempting, setLoginAttempting] = useState(false);
  const router = useRouter();

  const handlePiLogin = async () => {
    setLoginAttempting(true);
    try {
      await loginWithPi();
      router.push('/');
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setLoginAttempting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/IMG-20250709-WA0014.jpg"
                alt="Tangible Savers Logo"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold text-[#1A237E] dark:text-[#FFD700] leading-tight">
                Tangible
              </span>
              <span className="text-xl font-bold text-[#1A237E] dark:text-[#FFD700] leading-tight">
                Savers
              </span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Login with Pi to start saving
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <button
            onClick={handlePiLogin}
            disabled={loginAttempting || loading}
            className="w-full bg-gradient-to-r from-[#1A237E] to-[#283593] hover:from-[#283593] hover:to-[#1A237E] text-white px-8 py-4 rounded-lg font-bold text-lg transition disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <span>🥧</span>
            <span>{loginAttempting || loading ? 'Logging in...' : 'Login with Pi'}</span>
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">
              {error}
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>By logging in, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#1A237E] dark:text-[#FFD700] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
