import { Request, Response } from 'express';

import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from '../../src/controllers/task.controller.js';
import {
  CreateTaskDTO,
  TaskResponseDTO,
  UpdateTaskDTO,
} from '../../src/dtos/index.js';
import { mapTaskToTaskResponseDTO } from '../../src/utils/task-mapper.js';
import { prismaMock } from '../__mocks__/prisma.mock.js';

const tasksMock = [
  {
    id: 1,
    title: 'Task One',
    description: 'First sample task',
    status: 'Pending',
    priority: 'High',
    dueDate: new Date('2024-01-01T00:00:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    readOnly: false,
    deletedAt: null,
  },
  {
    id: 2,
    title: 'Task Two',
    description: 'Another test task',
    status: 'Completed',
    priority: 'Medium',
    dueDate: new Date('2024-02-01T00:00:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    readOnly: false,
    deletedAt: null,
  },
  {
    id: 3,
    title: 'Task Three',
    description: 'Third example task',
    status: 'Pending',
    priority: 'Low',
    dueDate: new Date('2024-03-01T00:00:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    readOnly: true,
    deletedAt: null,
  },
];

const tasksResponseMock: TaskResponseDTO[] = tasksMock.map(
  (task) => mapTaskToTaskResponseDTO(task) as TaskResponseDTO
);

describe('Task Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };
  });

  describe('getTasks', () => {
    it('should return all tasks', async () => {
      mockRequest = { params: {} };

      prismaMock.task.findMany.mockResolvedValue(tasksMock);

      await getTasks(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(tasksResponseMock);
    });

    it('should handle errors', async () => {
      prismaMock.task.findMany.mockRejectedValue(new Error('DB Error'));

      await getTasks(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'Failed to retrieve tasks',
      });
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      mockRequest = { params: { id: '1' } };
      prismaMock.task.findUnique.mockResolvedValue(tasksMock[1]);

      await getTaskById(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(tasksResponseMock[1]);
    });

    it('should return 404 if task not found', async () => {
      mockRequest = { params: { id: '1' } };
      prismaMock.task.findUnique.mockResolvedValue(null);

      await getTaskById(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Task not found' });
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      mockRequest = { body: { title: 'New Task' } as CreateTaskDTO };
      prismaMock.task.create.mockResolvedValue(tasksMock[0]);

      await createTask(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(tasksResponseMock[0]);
    });

    it('should handle errors during creation', async () => {
      mockRequest = { body: { title: 'New Task' } as CreateTaskDTO };
      prismaMock.task.create.mockRejectedValue(new Error('DB Error'));

      await createTask(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Failed to create task' });
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      mockRequest = {
        params: { id: '1' },
        body: { title: 'Updated Task' } as UpdateTaskDTO,
      };
      prismaMock.task.findUnique.mockResolvedValue(tasksMock[0]);
      prismaMock.task.update.mockResolvedValue({
        ...tasksMock[0],
        title: 'Updated Task',
      });

      await updateTask(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        ...tasksResponseMock[0],
        title: 'Updated Task',
      });
    });

    it('should return 404 if task is not found', async () => {
      mockRequest = { params: { id: '22' } };
      prismaMock.task.findUnique.mockResolvedValue(null);

      await updateTask(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
    });

    it('should return 403 if task is read-only', async () => {
      mockRequest = {
        params: { id: '3' },
        body: { title: 'Updated Task' } as UpdateTaskDTO,
      };
      prismaMock.task.findUnique.mockResolvedValue(tasksMock[2]);

      await updateTask(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(403);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      mockRequest = { params: { id: '1' } };
      prismaMock.task.findUnique.mockResolvedValue(tasksMock[0]);
      prismaMock.task.delete.mockResolvedValue({
        ...tasksMock[0],
        deletedAt: new Date(),
      });

      await deleteTask(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(204);
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'Task deleted successfully',
      });
    });

    it('should return 404 if task is not found', async () => {
      mockRequest = { params: { id: '11' } };
      prismaMock.task.findUnique.mockResolvedValue(null);

      await deleteTask(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
    });

    it('should return 403 if task is read-only', async () => {
      mockRequest = { params: { id: '3' } };
      prismaMock.task.findUnique.mockResolvedValue(tasksMock[2]);

      await deleteTask(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(403);
    });
  });
});
