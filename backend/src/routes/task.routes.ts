/**
 * Defines task-related routes for CRUD operations
 * Matches the endpoints defined in openapi.yaml under /api/tasks
 */
import express from 'express';
import { body, param } from 'express-validator';

import validate from '../middlewares/validate.js';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import { authenticateUser } from '../middlewares/authenticate-user.js';

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
    body('priority')
      .trim()
      .escape()
      .isIn(['Low', 'Medium', 'High'])
      .withMessage('Invalid priority'),
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
    body('priority').optional().escape().isIn(['Low', 'Medium', 'High']),
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