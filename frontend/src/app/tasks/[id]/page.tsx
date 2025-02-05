/**
 * Task Page
 *
 * This page displays detailed information about a specific task.
 * - Uses the `TaskDetails` component to render task information.
 * - Dynamically generates metadata based on the task ID for SEO.
 */

import { Metadata } from 'next';

import { TaskDetails } from '@/components/TaskDetails';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  return {
    title: `Task ${id} - Task Manager`,
    description: `View details of Task ${id}`,
  };
}

export default async function TaskPage() {
  return <TaskDetails />;
}
