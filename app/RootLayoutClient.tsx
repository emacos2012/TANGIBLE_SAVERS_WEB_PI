'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/lib/authContext';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { usePathname } from 'next/navigation';

const BottomTabNavigation = dynamic(
  () => import('@/components/BottomTabNavigation'),
  { loading: () => null }
);

export const RootLayoutClient: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loading } = useAuth();
  const pathname = usePathname();

  const isAuthPage = pathname === '/login' || pathname.startsWith('/admin');

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      {children}
      {!isAuthPage && <BottomTabNavigation />}
    </Suspense>
  );
};
