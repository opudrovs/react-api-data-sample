/**
 * Maps TaskModel to TaskResponseDTO, CreateTaskDTO, UpdateTaskDTO objects.
 */
import { TaskResponseDTO } from '../dtos';
import { TaskModel } from '../models/task.model.js';

export const mapTaskToTaskResponseDTO = (task: TaskModel): TaskResponseDTO => {
  const { createdAt, ...rest } = task;

  return {
    ...rest,
    dueDate: task.dueDate.toISOString(),
    deletedAt: task.deletedAt?.toISOString() ?? null,
  };
};
