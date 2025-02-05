'use client';

import { Box, Group, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { ConfirmModal } from '@/components/ConfirmModal';
import { TaskFormFields } from '@/components/TaskFormFields';
import { API_URL } from '@/constants';
import { TaskResponseDTO } from '@/dtos/task';
import { useTaskFormFields } from '@/hooks/useTaskFormFields';
import { UpdateTaskFormData } from '@/types/task';
import { logError } from '@/utils/logger';
import { showError, showSuccess } from '@/utils/notifications';

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
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${API_URL}/api/tasks/${id}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          setHasError(true);
          if (response.status === 404) {
            throw new Error('Task not found');
          } else {
            throw new Error('Failed to load task data');
          }
        }

        const task: TaskResponseDTO = await response.json();

        // Convert API response to UpdateTaskFormData
        reset({
          title: task.title,
          description: task.description || '',
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate, // Already a string (ISO format)
        }); // Directly update form fields
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : 'Unknown error occurred';
        showError(errorMsg);
        logError('Error fetching task data', error, { taskId: id });
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, reset]);

  if (loading) return <p>Loading...</p>;

  if (hasError) {
    return (
      <Box className="max-w-md mx-auto mt-2 p-6 bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg border">
        <h1 className="text-center text-2xl font-semibold mb-4">
          Task Not Found
        </h1>
        <Text className="text-center">Error loading task data.</Text>
      </Box>
    );
  }

  const taskId = Array.isArray(id) ? id[0] : (id ?? '');

  const handleDelete = async () => {
    setDeleteModalOpen(false);

    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to delete task');

      showSuccess('Task successfully deleted!');
      router.push('/tasks'); // Redirect to task list after successful deletion
    } catch (error) {
      showError('Failed to delete task. Please try again.');
      logError('Error deleting task', error, { taskId });
    }
  };

  return (
    <Box className="max-w-md mx-auto mt-2 p-6 bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg border">
      <h1 className="text-center text-2xl font-semibold mb-4">Edit Task</h1>

      {/* Task ID */}
      <div className="p-2 text-gray-700 dark:text-gray-300 text-sm bg-gray-100 dark:bg-gray-700 rounded-md mb-4">
        <strong>Task ID:</strong> {taskId}
      </div>

      <form
        onSubmit={handleSubmit((data) => onSubmit(data, taskId))}
        className="space-y-4"
      >
        <TaskFormFields control={control} register={register} errors={errors} />

        <Group justify="center">
          <Button type="submit" loading={isSubmitting}>
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

/**
 * Submits updated task data to backend
 */
const onSubmit = async (data: UpdateTaskFormData, taskId: string) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to update task');

    showSuccess('Task successfully updated!');
  } catch (error) {
    showError('Failed to update task. Please try again.');
    logError('Error updating task', error, { taskId, requestData: data });
  }
};
