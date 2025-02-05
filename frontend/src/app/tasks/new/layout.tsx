/**
 * Create Task Layout
 *
 * This layout wraps the Create Task page, providing a structured UI.
 * It includes a navigation link to return to the task list.
 */

import Link from 'next/link';

export default function CreateTaskLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-200 dark:shadow-md dark:rounded-md">
      <Link
        href="/"
        className="text-blue-500 hover:underline text-sm mb-4 inline-block"
      >
        ← Back to Task List
      </Link>
      {children}
    </div>
  );
}
