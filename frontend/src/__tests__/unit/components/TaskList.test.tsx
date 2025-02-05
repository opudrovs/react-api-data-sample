/**
 * Unit tests for the TaskList component.
 *
 * Ensures that TaskList:
 * - Fetches and displays tasks correctly.
 * - Shows a message when no tasks are available.
 * - Navigates to the task creation page when "New Task" is clicked.
 *
 * Mocks:
 * - Fetch API for simulating API responses.
 * - Next.js router for navigation.
 */

import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TaskList } from '@/components/TaskList';

// Mock API response
const mockTasks = [
  {
    id: 1,
    title: 'Task One',
    description: 'First test task',
    status: 'TO_DO',
    priority: 'HIGH',
    dueDate: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'Task Two',
    description: 'Second test task',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    dueDate: '2024-02-01T00:00:00Z',
  },
];

describe('TaskList Component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('renders the task list correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTasks),
      })
    );

    await act(async () => {
      renderWithProviders(<TaskList />);
    });

    await waitFor(() => {
      expect(screen.getByText('Task One')).toBeInTheDocument();
      expect(screen.getByText('Task Two')).toBeInTheDocument();
    });
  });

  it('shows "No tasks available" if API returns an empty list', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    await act(async () => {
      renderWithProviders(<TaskList />);
    });

    await waitFor(() => {
      expect(screen.getByText('No tasks available.')).toBeInTheDocument();
    });
  });

  it('navigates to "/tasks/new" when clicking "New Task" button', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTasks),
      })
    );

    await act(async () => {
      renderWithProviders(<TaskList />);
    });

    const newTaskButton = await screen.findByText('New Task');

    await userEvent.click(newTaskButton);

    expect(global.mockPush).toHaveBeenCalledWith('/tasks/new');
  });
});
