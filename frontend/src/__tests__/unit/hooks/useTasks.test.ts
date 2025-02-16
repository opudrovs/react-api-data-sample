import { act, renderHook, waitFor } from '@testing-library/react';

import { useTasks } from '@/hooks/useTasks';

jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    isAuthenticated: true,
    isAuthChecked: true,
  })),
}));

describe('useTasks Hook', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('fetches tasks correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, title: 'Task One', status: 'TO_DO' },
        { id: 2, title: 'Task Two', status: 'IN_PROGRESS' },
      ],
    });

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.refreshTasks();
    });

    await waitFor(() => expect(result.current.tasks.length).toBeGreaterThan(0));

    expect(result.current.loading).toBe(false);
    expect(result.current.tasks).toHaveLength(2);
    expect(result.current.tasks[0].title).toBe('Task One');
    expect(result.current.tasks[1].title).toBe('Task Two');
  });

  it('handles API errors gracefully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({ error: 'Internal Server Error' }),
    });

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.refreshTasks();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.tasks).toEqual([]);
  });
});
