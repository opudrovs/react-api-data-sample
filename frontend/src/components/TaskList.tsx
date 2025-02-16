'use client';

import { Box, Pagination } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button';
import { TaskCard } from '@/components/TaskCard';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';

const TASKS_PER_PAGE = 10;

/**
 * TaskList component is responsible for displaying a list of tasks with pagination.
 * On each task card, user can view full task details, edit, or delete the task.
 */
export const TaskList = () => {
  const { isAuthenticated, isAuthChecked } = useAuth();
  const { tasks, loading, page, setPage, totalPages, refreshTasks } = useTasks(
    TASKS_PER_PAGE,
    isAuthenticated,
    isAuthChecked
  );
  const router = useRouter();

  // const fetchTasks = () => {
  //   setLoading(true);

  //   fetch(`${API_URL}/api/tasks`, { credentials: 'include', cache: 'no-store' })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTasks(data);

  //       // Adjust page if it's now out of bounds
  //       const numPages = Math.ceil(data.length / TASKS_PER_PAGE);
  //       if (page > numPages) {
  //         setPage(Math.max(numPages, 1));
  //       }
  //     })
  //     .catch((error) => {
  //       logError('Failed to fetch tasks', error);
  //       showError('Failed to load tasks.');
  //     })
  //     .finally(() => setLoading(false));
  // };

  if (!isAuthChecked) return <p>Loading authentication...</p>;
  if (loading) return <p>Loading tasks...</p>;
  if (tasks.length === 0) return <p>No tasks available.</p>;

  const startIndex = (page - 1) * TASKS_PER_PAGE;
  const displayedTasks = tasks.slice(startIndex, startIndex + TASKS_PER_PAGE);

  return (
    <Box className="max-w-2xl mx-auto p-4">
      <h1 className="text-center text-2xl font-semibold mb-4">Task List</h1>

      {/* Create Task Button */}
      <div className="flex justify-end mb-4">
        <Button onClick={() => router.push('/tasks/new')}>New Task</Button>
      </div>

      {/* Top Pagination */}
      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        className="mt-2 mb-6 flex justify-center"
      />

      {/* Task Cards */}
      <div className="space-y-4">
        {displayedTasks.map((task) => (
          <TaskCard key={task.id} task={task} onTaskDeleted={refreshTasks} />
        ))}
      </div>

      {/* Bottom Pagination */}
      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        className="mt-6 flex justify-center"
      />
    </Box>
  );
};
