/**
 * Task Utilities
 *
 * This module provides utility functions for handling task-related data transformations.
 * It includes:
 * - Mapping `TaskModel` entities to `TaskResponseDTO` objects.
 * - Defining user-friendly labels for task statuses and priorities.
 * - Functions to convert task status and priority values to their corresponding labels.
 */

import { TaskResponseDTO } from '@/dtos/task.js';
import { TaskModel } from '@/models/TaskModel.js';
import { TaskPriority, TaskStatus } from '@/types/task';

/**
 * Maps TaskModel to DTO objects.
 */
export const mapTaskToTaskResponseDTO = (task: TaskModel): TaskResponseDTO => ({
  id: task.id,
  title: task.title,
  description: task.description ?? '',
  status: task.status,
  priority: task.priority,
  dueDate: task.dueDate.toISOString(),
});

type TaskOption<T extends string> = { value: T; label: string };

/**
 * Maps task status values to user-friendly labels.
 */
export const STATUS_OPTIONS: TaskOption<TaskStatus>[] = [
  { value: 'TO_DO', label: 'To Do' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'COMPLETED', label: 'Completed' },
];

export const mapStatusToLabel = (status: TaskStatus): string => {
  return STATUS_OPTIONS.find((s) => s.value === status)?.label || 'Unknown';
};

export const PRIORITY_OPTIONS: TaskOption<TaskPriority>[] = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

/**
 * Maps task priority values to user-friendly labels.
 */
export const mapPriorityToLabel = (priority: TaskPriority): string => {
  return PRIORITY_OPTIONS.find((p) => p.value === priority)?.label || 'Unknown';
};
