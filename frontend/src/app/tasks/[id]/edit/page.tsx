/**
 * Edit Task Page
 *
 * This page provides an interface for users to edit task fields.
 * It renders the `EditTaskForm` component for input and submission.
 */

import { Metadata } from 'next';

import { EditTaskForm } from '@/components/EditTaskForm';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  return {
    title: `Edit Task ${id} - Task Manager`,
    description: `Modify the details of Task ${id}.`,
  };
}

export default async function EditTaskPage() {
  return <EditTaskForm />;
}
