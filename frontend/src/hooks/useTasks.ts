import { useCallback, useEffect, useState } from 'react';

import { TaskResponseDTO } from '@/dtos/task';
import { fetchApi } from '@/utils/fetchApi';
import { logError } from '@/utils/logger';
import { showError } from '@/utils/notifications';

/**
 * Custom hook for fetching a paginated list of tasks.
 *
 * Features:
 * - Fetches tasks from the API and updates the state.
 * - Supports pagination by tracking the current page.
 * - Handles loading and error states.
 * - Ensures fresh data by using `cache: 'no-store'`.s
 */
export const useTasks = (
  tasksPerPage = 10,
  isAuthenticated: boolean,
  isAuthChecked: boolean
) => {
  const [tasks, setTasks] = useState<TaskResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = useCallback(async () => {
    setLoading(true);

    try {
      const data = await fetchApi<TaskResponseDTO[]>('/api/tasks');
      setTasks(data);

      // Calculate total pages dynamically
      const numPages = Math.ceil(data.length / tasksPerPage);
      setTotalPages(numPages);

      // Adjust page if it's now out of bounds
      if (page > numPages) {
        setPage(Math.max(numPages, 1));
      }
    } catch (error) {
      logError('Failed to fetch tasks', error);
      showError('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  }, [page, tasksPerPage]);

  useEffect(() => {
    if (!isAuthChecked || !isAuthenticated) return;

    fetchTasks();
  }, [isAuthenticated, isAuthChecked, fetchTasks]);

  return {
    tasks,
    loading,
    page,
    setPage,
    totalPages,
    refreshTasks: fetchTasks,
  };
};
