/**
 * Defines task-related routes for CRUD operations
 * Matches the endpoints defined in openapi.yaml under /api/tasks
 */

import express from 'express';
import { body, param } from 'express-validator';

import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from '../controllers/task.controller.js';
import { authenticateUser } from '../middlewares/authenticate-user.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

router.get('/', authenticateUser, getTasks);

router.get(
  '/:id',
  authenticateUser,
  param('id').isInt().withMessage('Task ID must be an integer'),
  validate,
  getTaskById
);

router.post(
  '/',
  authenticateUser,
  [
    body('title').trim().escape().notEmpty().withMessage('Title is required'),
    body('description')
      .optional()
      .trim()
      .escape()
      .isString()
      .withMessage('Description must be a string'),
    body('status')
      .trim()
      .escape()
      .isIn(['TO_DO', 'IN_PROGRESS', 'PENDING', 'COMPLETED'])
      .withMessage(
        'Invalid status. Status can be "TO_DO", "IN_PROGRESS", "PENDING", or "COMPLETED"'
      ),
    body('priority')
      .trim()
      .escape()
      .isIn(['LOW', 'MEDIUM', 'HIGH'])
      .withMessage(
        'Invalid priority. Priority can be "LOW", "MEDIUM", or "HIGH"'
      ),
    body('dueDate')
      .trim()
      .escape()
      .isISO8601()
      .toDate()
      .withMessage('Invalid date format'),
  ],
  validate,
  createTask
);

router.put(
  '/:id',
  authenticateUser,
  [
    param('id')
      .trim()
      .escape()
      .isInt()
      .withMessage('Task ID must be an integer'),
    body('title').optional().trim().escape().isString(),
    body('description')
      .optional()
      .trim()
      .escape()
      .isString()
      .withMessage('Description must be a string'),
    body('status')
      .trim()
      .escape()
      .isIn(['TO_DO', 'IN_PROGRESS', 'PENDING', 'COMPLETED'])
      .withMessage(
        'Invalid status. Status can be "TO_DO", "IN_PROGRESS", "PENDING", or "COMPLETED"'
      ),
    body('priority')
      .trim()
      .escape()
      .isIn(['LOW', 'MEDIUM', 'HIGH'])
      .withMessage(
        'Invalid priority. Priority can be "LOW", "MEDIUM", or "HIGH"'
      ),
    body('dueDate').optional().escape().isISO8601().toDate(),
  ],
  validate,
  updateTask
);

router.delete(
  '/:id',
  authenticateUser,
  [
    param('id')
      .trim()
      .escape()
      .isInt()
      .withMessage('Task ID must be an integer'),
  ],
  validate,
  deleteTask
);

export default router;
