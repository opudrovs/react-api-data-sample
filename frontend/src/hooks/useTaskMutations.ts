import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { TaskResponseDTO } from '@/dtos/task';
import { fetchApi } from '@/utils/fetchApi';
import { logError } from '@/utils/logger';
import { showError, showSuccess } from '@/utils/notifications';

/**
 * Custom hook for handling task mutations (creating, updating, and deleting tasks).
 *
 * This hook provides:
 * - `createTask`: Sends a POST request to create a new task.
 * - `updateTask`: Sends a PUT request to update an existing task.
 * - `deleteTask`: Sends a DELETE request to remove a task.
 * - `loading`: A boolean flag indicating whether an API request is in progress.
 *
 * Features:
 * - Uses `useCallback` to prevent unnecessary re-creations of mutation functions.
 * - Provides success and error notifications for user feedback.
 * - Logs errors for debugging.
 * - Does not enforce navigation after mutations, allowing components to handle UI updates as needed.
 *
 * @returns {Object} An object containing:
 *  - `createTask`: Function to create a new task.
 *  - `updateTask`: Function to update an existing task.
 *  - `deleteTask`: Function to delete a task.
 *  - `loading`: Boolean indicating whether a request is in progress.
 */
export const useTaskMutations = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createTask = useCallback(
    async (taskData: Partial<TaskResponseDTO>) => {
      setLoading(true);
      try {
        await fetchApi('/api/tasks', 'POST', taskData);
        showSuccess('Task successfully created!');
        router.push('/tasks'); // Navigate to task list
      } catch (error) {
        logError('Error creating task', error);
        showError('Failed to create task. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const updateTask = useCallback(
    async (taskId: string | number, taskData: Partial<TaskResponseDTO>) => {
      setLoading(true);
      try {
        await fetchApi(`/api/tasks/${taskId}`, 'PUT', taskData);
        showSuccess('Task successfully updated!');
      } catch (error) {
        logError('Error updating task', error);
        showError('Failed to update task. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteTask = useCallback(
    async (taskId: string | number) => {
      setLoading(true);
      try {
        await fetchApi(`/api/tasks/${taskId}`, 'DELETE');
        showSuccess('Task successfully deleted!');
        router.push('/tasks'); // Navigate to task list
      } catch (error) {
        logError('Error deleting task', error);
        showError('Failed to delete task. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  return { createTask, updateTask, deleteTask, loading };
};
