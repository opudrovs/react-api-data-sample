'use client';

import { Box, Group, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { ConfirmModal } from '@/components/ConfirmModal';
import { TaskFormFields } from '@/components/TaskFormFields';
import { useTask } from '@/hooks/useTask';
import { useTaskFormFields } from '@/hooks/useTaskFormFields';
import { useTaskMutations } from '@/hooks/useTaskMutations';
import { UpdateTaskFormData } from '@/types/task';

/**
 * EditTaskForm Component
 *
 * This component renders a form for editing an existing task.
 * - Fetches task data from the backend and pre-populates the form.
 * - Allows users to update or delete a task.
 * - Handles form submission with validation and API requests.
 * - Shows error messages if fetching or updating fails.
 *
 * Features:
 * - Loads existing task details for editing.
 * - Provides form validation with `useTaskFormFields`.
 * - Supports deleting a task with a confirmation modal.
 * - Displays loading and error states.
 */
export const EditTaskForm = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  // Fetch task data using custom hook
  const { task, loading } = useTask(id);

  // Use mutations hook for updating and deleting tasks
  const {
    updateTask,
    deleteTask,
    loading: mutationLoading,
  } = useTaskMutations();

  // Initialize form fields
  const { control, register, handleSubmit, reset, errors, isSubmitting } =
    useTaskFormFields({
      defaultValues: {
        title: '',
        description: '',
        status: 'TO_DO',
        priority: 'MEDIUM',
        dueDate: new Date().toISOString(),
      },
      mode: 'edit',
    });

  // Reset form when task data is available and different from current form state
  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate, // Already a string (ISO format)
      });
    }
  }, [task, reset]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (!task) {
    return (
      <Box className="max-w-md mx-auto mt-2 p-6 bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg border">
        <h1 className="text-center text-2xl font-semibold mb-4">
          Task Not Found
        </h1>
        <Text className="text-center">Error loading task data.</Text>
      </Box>
    );
  }

  const handleUpdate = async (data: UpdateTaskFormData) => {
    await updateTask(id, data);
  };

  const handleDelete = async () => {
    setDeleteModalOpen(false);
    await deleteTask(id);
  };

  return (
    <Box className="max-w-md mx-auto mt-2 p-6 bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg border">
      <h1 className="text-center text-2xl font-semibold mb-4">Edit Task</h1>

      {/* Task ID */}
      <div className="p-2 text-gray-700 dark:text-gray-300 text-sm bg-gray-100 dark:bg-gray-700 rounded-md mb-4">
        <strong>Task ID:</strong> {id}
      </div>

      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
        <TaskFormFields control={control} register={register} errors={errors} />

        <Group justify="center">
          <Button type="submit" loading={isSubmitting || mutationLoading}>
            Update Task
          </Button>
          <Button variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button
            type="button"
            onClick={() => router.push('/tasks')}
            variant="outline"
          >
            Cancel
          </Button>
        </Group>

        {/* Delete Button */}
        <div className="mt-4 flex justify-center">
          <Button
            variant="filled"
            color="red"
            onClick={() => setDeleteModalOpen(true)}
            disabled={mutationLoading}
          >
            Delete Task
          </Button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />
    </Box>
  );
};
