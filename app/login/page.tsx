'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';

export default function LoginPage() {
  const { loginWithPi, loading: authLoading, error: authError } = useAuth();
  const [loginAttempting, setLoginAttempting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const router = useRouter();

  // Combine loading states for a cleaner UI check
  const isProcessing = loginAttempting || authLoading;
  // Use either the error from context or a local error from a failed try/catch
  const displayError = authError || localError;

  const handlePiLogin = async () => {
    // Prevent multiple clicks if already processing
    if (isProcessing) return;

    setLoginAttempting(true);
    setLocalError(null);

    try {
      await loginWithPi();
      // Only redirect if successful
      router.push('/');
    } catch (err: any) {
      console.error('Login failed:', err);
      setLocalError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setLoginAttempting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-md bg-gray-100">
              <Image
                src="/logo.jpg" // Renamed from IMG-20250709... for clarity
                alt="Tangible Savers Logo"
                fill
                className="object-cover"
                sizes="64px"
                priority // Added priority since this is a main login logo
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

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <button
            onClick={handlePiLogin}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-[#1A237E] to-[#283593] hover:from-[#283593] hover:to-[#1A237E] text-white px-8 py-4 rounded-lg font-bold text-lg transition disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {isProcessing ? (
              <>
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span role="img" aria-label="Pi Logo">🥧</span>
                <span>Login with Pi</span>
              </>
            )}
          </button>

          {displayError && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-md text-sm">
              <p className="font-semibold mb-1">Login Error</p>
              {displayError}
            </div>
          )}

          <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            <p>
              By logging in, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-gray-700">Terms of Service</Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:text-gray-700">Privacy Policy</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#1A237E] dark:text-[#FFD700] hover:underline text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}