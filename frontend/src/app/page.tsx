'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { TaskResponseDTO } from '@/dtos';
import { useAuth } from '@/hooks/useAuth';

export const API_ROOT = 'http://localhost:4000';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Redirect to /login if user is not authenticated
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Fetch tasks when user is authenticated
    fetch(API_ROOT + '/api/tasks', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isAuthenticated, router]);

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return null; // Prevent UI flicker before redirect

  return (
    <div>
      <h1 className="text-xl font-bold">Task List</h1>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task: TaskResponseDTO) => (
            <li key={task.id}>{task.title}</li>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
    </div>
  );
}
