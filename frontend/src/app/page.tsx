/**
 * Home Page (Task List)
 *
 * This is the main page of the application, displaying the list of tasks.
 * - Uses the `TaskList` component to show tasks.
 * - Includes metadata for SEO and accessibility.
 */

import { Metadata } from 'next';

import { TaskList } from '@/components/TaskList';

export const metadata: Metadata = {
  title: 'Task Manager - Your Tasks',
  description: 'A simple task management app with authentication.',
};

export default function Home() {
  return <TaskList />;
}
