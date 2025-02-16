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
 * - Ensures fresh data by using `cache: 'no-store'`.
 *
 * @returns {Object} - Returns the following properties:
 *  - `tasks` (TaskResponseDTO[]): List of tasks fetched from the API.
 *  - `loading` (boolean): Indicates whether tasks are currently being loaded.
 *  - `page` (number): Current page number.
 *  - `setPage` (function): Function to update the current page.
 *  - `totalPages` (number): Total number of pages available.
 *  - `refreshTasks` (function): Function to manually refresh the task list.
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
      const data = (await fetchApi<TaskResponseDTO[]>('/api/tasks')) || []; // Ensure array
      setTasks(data);

      // Calculate total pages dynamically
      const numPages = Math.ceil(data.length / tasksPerPage);
      setTotalPages(numPages);

      // Reset page if out of bounds
      setPage((prevPage) => Math.min(prevPage, numPages) || 1);
    } catch (error) {
      logError('Failed to fetch tasks', error);
      showError('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  }, [tasksPerPage]);

  useEffect(() => {
    if (!isAuthChecked || !isAuthenticated) return;

    fetchTasks();
  }, [isAuthenticated, isAuthChecked, fetchTasks]);

  // Get paginated tasks
  const displayedTasks = tasks.slice(
    (page - 1) * tasksPerPage,
    page * tasksPerPage
  );

  return {
    tasks,
    displayedTasks,
    loading,
    page,
    setPage,
    totalPages,
    refreshTasks: fetchTasks,
  };
};
