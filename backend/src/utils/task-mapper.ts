/**
 * Maps TaskModel to DTO objects.
 */
import { TaskResponseDTO } from '../dtos/index.js';
import { TaskModel } from '../models/task.model.js';

export const mapTaskToTaskResponseDTO = (task: TaskModel): TaskResponseDTO => ({
  id: task.id,
  title: task.title,
  description: task.description ?? '',
  status: task.status,
  priority: task.priority,
  dueDate: task.dueDate.toISOString(),
  deletedAt: task.deletedAt?.toISOString() ?? null,
  readOnly: task.readOnly,
});
