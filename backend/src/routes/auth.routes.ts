/**
 * Defines authentication-related routes for the API
 * Matches the POST /api/auth/login endpoint in openapi.yaml
 */
import express from 'express';
import { body } from 'express-validator';

import {
  loginHandler,
  logoutHandler,
  validateAuthHandler,
} from '../controllers/auth.controller.js';
import { authenticateUser } from '../middlewares/authenticate-user.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Invalid email format'),
    body('password')
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  validate,
  loginHandler
);

router.post('/logout', logoutHandler);

router.get('/status', authenticateUser, (req, res) => {
  res.status(200).json({ message: 'User is authenticated' });
});

router.get('/validate', validateAuthHandler, (req, res) => {
  res.status(200).json({ message: 'User is authenticated' });
});

export default router;
