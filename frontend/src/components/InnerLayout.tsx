'use client';

import Image from 'next/image';
import Link from 'next/link';

import { LogoutButton } from '@/components/LogoutButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useAutoLogout } from '@/hooks/useAutoLogout';

/**
 * Provides a common layout with navigation and authentication-aware elements.
 */
export const InnerLayout = ({ children }: { children: React.ReactNode }) => {
  useAutoLogout();
  const { isAuthenticated, isAuthChecked } = useAuth();

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-800">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Task Manager Logo"
            width={40}
            height={22}
            priority
            className="w-auto h-22"
          />
          <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Task Manager
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthChecked && isAuthenticated && <LogoutButton />}
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-6">{children}</main>
    </div>
  );
};
