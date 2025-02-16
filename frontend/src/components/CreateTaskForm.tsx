'use client';

import { Box, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button';
import { TaskFormFields } from '@/components/TaskFormFields';
import { useTaskFormFields } from '@/hooks/useTaskFormFields';
import { useTaskMutations } from '@/hooks/useTaskMutations';
import { CreateTaskFormData } from '@/types/task';

/**
 * CreateTaskForm Component
 *
 * This component renders a form for creating a new task. It integrates:
 * - Form state management using `useTaskFormFields`.
 * - Uses `useTaskFormFields` for form state management.
 * - Uses `useTaskMutations` to handle API interactions.
 *
 * Features:
 * - Prefills the form with default values.
 * - Submits the form data to the backend.
 * - Provides buttons to reset, cancel, or submit the form.
 * - Displays validation errors if the input is invalid.
 */
export const CreateTaskForm = () => {
  const router = useRouter();
  const { createTask, loading } = useTaskMutations();
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
    await createTask(data);
  };

  const isDisabled = loading || isSubmitting;

  return (
    <Box className="max-w-md mx-auto mt-2 p-6 bg-gray-200 dark:bg-gray-800 shadow-lg rounded-lg border">
      <h1 className="text-center text-2xl font-semibold mb-4">Create Task</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TaskFormFields control={control} register={register} errors={errors} />

        <Group justify="center">
          <Button type="submit" loading={isDisabled}>
            Create Task
          </Button>
          <Button
            variant="outline"
            onClick={() => reset()}
            disabled={isDisabled}
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
