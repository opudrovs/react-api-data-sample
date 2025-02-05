'use client';

import { Box, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button';
import { TaskFormFields } from '@/components/TaskFormFields';
import { API_URL } from '@/constants';
import { useTaskFormFields } from '@/hooks/useTaskFormFields';
import { CreateTaskFormData } from '@/types/task';
import { logError } from '@/utils/logger';
import { showError, showSuccess } from '@/utils/notifications';

/**
 * CreateTaskForm Component
 *
 * This component renders a form for creating a new task. It integrates:
 * - Form state management using `useTaskFormFields`.
 * - API request handling for submitting new tasks.
 * - Notifications for success and error handling.
 *
 * Features:
 * - Prefills the form with default values.
 * - Submits the form data to the backend.
 * - Provides buttons to reset, cancel, or submit the form.
 * - Displays validation errors if the input is invalid.
 */
export const CreateTaskForm = () => {
  const router = useRouter();
  const defaultDueDate = new Date();
  defaultDueDate.setDate(defaultDueDate.getDate() + 7);

  const defaultValues: CreateTaskFormData = {
    title: '',
    description: '',
    status: 'TO_DO',
    priority: 'MEDIUM',
    dueDate: defaultDueDate.toISOString(),
  };

  const { control, register, handleSubmit, reset, errors, isSubmitting } =
    useTaskFormFields({ defaultValues, mode: 'create' });

  const onSubmit = async (data: CreateTaskFormData) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create task');

      showSuccess('Task successfully created!');
      router.push('/tasks');
    } catch (error) {
      showError('Failed to create task. Please try again.');
      logError('Error creating task', error, { requestData: data });
    }
  };

  return (
    <Box className="max-w-md mx-auto mt-2 p-6 bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg border">
      <h1 className="text-center text-2xl font-semibold mb-4">Create Task</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TaskFormFields control={control} register={register} errors={errors} />

        <Group justify="center">
          <Button type="submit" loading={isSubmitting}>
            Create Task
          </Button>
          <Button
            variant="outline"
            onClick={() => reset()}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button
            type="button"
            onClick={() => router.push('/')}
            variant="outline"
          >
            Cancel
          </Button>
        </Group>
      </form>
    </Box>
  );
};
