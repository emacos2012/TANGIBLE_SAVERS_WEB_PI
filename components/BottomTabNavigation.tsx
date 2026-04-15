'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';

const BottomTabNavigation: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Home', icon: '🏠', href: '/' },
    { label: 'Housing', icon: '🏠', href: '/housing' },
    { label: 'Mall', icon: '🛍️', href: '/mall' },
    { label: 'Logistics', icon: '📦', href: '/logistics' },
    { label: 'Profile', icon: '👤', href: '/profile' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition ${
                isActive(item.href)
                  ? 'text-[#1A237E] dark:text-[#FFD700]'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-semibold">{item.label}</span>
            </Link>
          ))}

          {/* Logout Button */}
          {user && (
            <button
              onClick={() => logout()}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition text-xs"
            >
              <span className="text-2xl">🚪</span>
              <span className="text-xs font-semibold">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BottomTabNavigation;
