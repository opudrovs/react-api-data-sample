import { useCallback, useEffect, useState } from 'react';

import { TaskResponseDTO } from '@/dtos/task';
import { fetchApi } from '@/utils/fetchApi';
import { logError } from '@/utils/logger';
import { showError } from '@/utils/notifications';

/**
 * Custom React hook for fetching a single task.
 *
 * This hook:
 * - Fetches a specific task by its `taskId` when the hook is used.
 * - Provides a `loading` state to indicate whether data is being fetched.
 * - Exposes a `refreshTask` function to manually trigger a task refresh.
 * - Ensures that no API call is made if `taskId` is null or undefined.
 * - Uses `useCallback` to stabilize the fetch function and prevent unnecessary re-fetching.
 *
 * @returns {Object} - Returns the following properties:
 *  - `task` (TaskResponseDTO | null): The fetched task data, or `null` if not loaded.
 *  - `loading` (boolean): Indicates whether the task is currently being fetched.
 *  - `refreshTask` (function): Function to manually refresh the task data.
 */
export const useTask = (taskId: string | null) => {
  const [task, setTask] = useState<TaskResponseDTO | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTask = useCallback(async () => {
    if (!taskId) return;

    setLoading(true);
    try {
      const data = await fetchApi<TaskResponseDTO>(`/api/tasks/${taskId}`);
      setTask(data);
    } catch (error) {
      logError('Failed to fetch task', error);
      showError('Failed to load task.');
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  return { task, loading, refreshTask: fetchTask };
};
