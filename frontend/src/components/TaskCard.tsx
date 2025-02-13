'use client';

import { Card, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { ConfirmModal } from '@/components/ConfirmModal';
import { API_URL } from '@/constants';
import { TaskResponseDTO } from '@/dtos/task';
import { logError } from '@/utils/logger';
import { showError, showSuccess } from '@/utils/notifications';

type TaskCardProps = {
  task: TaskResponseDTO;
  onTaskDeleted: () => void;
};

/**
 * TaskCard component displays simplified task details.
 */
export const TaskCard = ({ task, onTaskDeleted }: TaskCardProps) => {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    setDeleteModalOpen(false);

    try {
      const response = await fetch(`${API_URL}/api/tasks/${task.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to delete task');

      showSuccess('Task successfully deleted!');
      onTaskDeleted();
    } catch (error) {
      showError('Failed to delete task. Please try again.');
      logError('Error deleting task', error, { taskId: task.id });
    }
  };

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder className="space-y-2">
      <Text>
        <strong>{task.title}</strong>
      </Text>
      <Text size="sm">{task.description || 'No description'}</Text>
      <Text size="sm" className="text-gray-500">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </Text>

      <div className="flex justify-end space-x-2 mt-3">
        <Button
          variant="outline"
          onClick={() => router.push(`/tasks/${task.id}`)}
        >
          View
        </Button>
        <Button onClick={() => router.push(`/tasks/${task.id}/edit`)}>
          Edit
        </Button>
        <Button
          variant="filled"
          color="red"
          onClick={() => setDeleteModalOpen(true)}
        >
          Delete
        </Button>
      </div>

      <ConfirmModal
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />
    </Card>
  );
};
