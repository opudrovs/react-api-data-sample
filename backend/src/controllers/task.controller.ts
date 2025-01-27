/**
 * Handles CRUD operations for tasks.
 * Matches paths defined in openapi.yaml for GET /api/tasks and POST /api/tasks
 */
import { Request, Response } from 'express';

import {
  CreateTaskDTO,
  TaskResponseDTO,
  UpdateTaskDTO,
} from '../dtos/index.js';
import { TaskModel } from '../models/task.model.js';
import prisma from '../utils/prisma.js';
import { mapTaskToTaskResponseDTO } from '../utils/task-mapper.js';

/**
 * Retrieves all tasks that are not soft deleted.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks: TaskModel[] = await prisma.task.findMany({
      where: { deletedAt: null },
    });

    const response: TaskResponseDTO[] = tasks.map((task) =>
      mapTaskToTaskResponseDTO(task)
    );

    res.status(200).json(response);
  } catch (error) {
    console.error('Unexpected tasks retrieval error:', error);
    res.status(500).json({ message: 'Failed to retrieve tasks' });
  }
};

/**
 * Retrieves a specific task by its ID if not soft deleted.
 * @param req - The Express request object containing the task ID.
 * @param res - The Express response object.
 */
export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task: TaskModel | null = await prisma.task.findUnique({
      where: { id: parseInt(id), deletedAt: null },
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    const response: TaskResponseDTO = mapTaskToTaskResponseDTO(task);

    res.status(200).json(response);
  } catch (error) {
    console.error('Unexpected task retrieval error:', error);
    res.status(500).json({ message: 'Failed to retrieve task' });
  }
};

/**
 * Creates a new task based on the request body data.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
export const createTask = async (req: Request, res: Response) => {
  try {
    const taskData: CreateTaskDTO = req.body;
    const newTask: TaskModel = await prisma.task.create({ data: taskData });
    const response: TaskResponseDTO = mapTaskToTaskResponseDTO(newTask);

    res.status(201).json(response);
  } catch (error) {
    console.error('Unexpected task creation error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

/**
Updates a task based on the request body data.
Prevents updating a task that has already been deleted.
@param req - The Express request object containing the task ID and update data.
@param res - The Express response object with update confirmation or error.
*/
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateTaskDTO = req.body;

  try {
    // Check if the task exists and is not soft deleted
    const task: TaskModel | null = await prisma.task.findUnique({
      where: { id: parseInt(id), deletedAt: null },
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found or already deleted' });
      return;
    }

    // Check if the task is read-only
    if (task.readOnly) {
      res
        .status(403)
        .json({ message: 'Task is read-only and cannot be updated' });
      return;
    }

    // Proceed with the update only if task is not read-only
    const updatedTask: TaskModel = await prisma.task.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    const response: TaskResponseDTO = mapTaskToTaskResponseDTO(updatedTask);

    res.status(200).json(response);
  } catch (error) {
    console.error('Unexpected task update error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

/**
 * Soft deletes a task by updating its `deletedAt` timestamp.
 * Prevents deleting a task that has already been deleted.
 * @param req - The Express request object containing the task ID.
 * @param res - The Express response object with deletion confirmation or error.
 */
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Check if the task exists and is not already deleted
    const task: TaskModel | null = await prisma.task.findUnique({
      where: { id: parseInt(id), deletedAt: null },
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found or already deleted' });
      return;
    }

    // Check if the task is read-only
    if (task.readOnly) {
      res
        .status(403)
        .json({ message: 'Task is read-only and cannot be deleted' });
      return;
    }

    // Proceed with the soft deletion only if task is active
    await prisma.task.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date() },
    });

    res.status(204).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Unexpected task deletion error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
