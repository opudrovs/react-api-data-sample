'use client';

import { Box, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { ConfirmModal } from '@/components/ConfirmModal';
import { useTask } from '@/hooks/useTask';
import { useTaskMutations } from '@/hooks/useTaskMutations';
import { mapPriorityToLabel, mapStatusToLabel } from '@/utils/taskUtils';

/**
 * Task Details Component
 *
 * This component displays detailed information about a specific task.
 * - Fetches task data from the backend using the task ID from the URL.
 * - Displays task fields.
 * - Allows users to delete or edit the task.
 * - Handles loading states and error messages.
 *
 * Features:
 * - Uses `useEffect` to fetch task details on component mount.
 * - Provides user-friendly labels for task status and priority.
 * - Displays a confirmation modal before deleting a task.
 * - Uses `showError` and `showSuccess` notifications for user feedback.
 */
export const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { task, loading } = useTask(id);
  const { deleteTask, loading: deleteLoading } = useTaskMutations();

  const handleDelete = async () => {
    setDeleteModalOpen(false);
    if (!task) return;
    await deleteTask(task.id);
  };

  if (loading) return <p>Loading task details...</p>;
  if (!task) return <p>Task not found.</p>;

  return (
    <Box className="max-w-md mx-auto mt-2 p-6 bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg border space-y-4">
      <h1 className="text-center text-2xl font-semibold">View Task</h1>

      {/* Task ID */}
      <div className="p-2 text-gray-700 dark:text-gray-300 text-sm bg-gray-100 dark:bg-gray-700 rounded-md mb-4">
        <strong>Task ID:</strong> {task.id}
      </div>

      {/* Task Fields */}
      <h2 className="text-2xl font-semibold">{task.title}</h2>
      <Text>{task.description || 'No description'}</Text>
      <Text>
        <strong>Status:</strong> {mapStatusToLabel(task.status)}
      </Text>
      <Text>
        <strong>Priority:</strong> {mapPriorityToLabel(task.priority)}
      </Text>
      <Text>
        <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
      </Text>

      {/* Buttons */}
      <div className="mt-4 space-x-2">
        <Button onClick={() => router.push(`/tasks/${task.id}/edit`)}>
          Edit Task
        </Button>
        <Button
          variant="filled"
          color="red"
          onClick={() => setDeleteModalOpen(true)}
          disabled={deleteLoading}
        >
          {deleteLoading ? 'Deleting...' : 'Delete Task'}
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />
    </Box>
  );
};
