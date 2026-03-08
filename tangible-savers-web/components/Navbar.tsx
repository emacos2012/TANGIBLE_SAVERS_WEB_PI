'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/authContext';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isAuthPage = pathname === '/login' || pathname.startsWith('/admin');

  return (
    <header
      className={`sticky top-0 z-40 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
            <Image
              src="/IMG-20250709-WA0014.jpg"
              alt="Tangible Savers Logo"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 40px, 48px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold text-[#1A237E] dark:text-[#FFD700] leading-tight">
              Tangible
            </span>
            <span className="text-sm md:text-base font-semibold text-[#1A237E] dark:text-[#FFD700] leading-tight">
              Savers
            </span>
          </div>
        </Link>

        {/* Navigation & Auth */}
        <div className="flex items-center gap-3 md:gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-[#1A237E] dark:text-[#FFD700]">
                  {user.username}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user.role}
                </span>
              </div>
              <button
                onClick={() => logout()}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          ) : (
            !isAuthPage && (
              <Link
                href="/login"
                className="bg-[#1A237E] dark:bg-[#FFD700] text-white dark:text-[#1A237E] hover:opacity-90 px-4 py-2 rounded-lg font-semibold text-sm transition-opacity"
              >
                Login
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
