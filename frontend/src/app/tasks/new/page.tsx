/**
 * Create Task Page
 *
 * This page provides an interface for users to create a new task.
 * It renders the `CreateTaskForm` component for input and submission.
 */

import { Metadata } from 'next';

import { CreateTaskForm } from '@/components/CreateTaskForm';

export const metadata: Metadata = {
  title: 'Create New Task - Task Manager',
  description: 'Add a new task and manage your tasks efficiently.',
};

export default function CreateTaskPage() {
  return <CreateTaskForm />;
}
