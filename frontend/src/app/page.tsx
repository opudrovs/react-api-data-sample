'use client';

import { useEffect, useState } from 'react';

import { API_URL } from '@/constants';
import { TaskResponseDTO } from '@/dtos';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { isAuthenticated, isAuthChecked } = useAuth();
  const [tasks, setTasks] = useState<TaskResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth check before making any decision
    if (!isAuthChecked) return;

    // Redirect to /login if user is not authenticated
    if (!isAuthenticated) {
      return;
    }

    // Fetch tasks when user is authenticated
    fetch(`${API_URL}/api/tasks`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Failed to fetch tasks:', error))
      .finally(() => setLoading(false));
  }, [isAuthenticated, isAuthChecked]);

  // Prevent UI flickering before authentication is checked
  if (!isAuthChecked) return <p>Loading authentication...</p>;
  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">Task List</h1>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => <li key={task.id}>{task.title}</li>)
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
    </div>
  );
}
