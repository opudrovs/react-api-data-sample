/**
 * Entry point for the Express application. Sets up routes and middleware.
 * Sets up all routes and Swagger UI as specified in openapi.yaml
 */

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import { setupSwagger } from './swagger.js';

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Security Headers
app.use(helmet());

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(cookieParser());
app.use(express.json());

const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to N requests per `windowMs`
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting
app.use(limiter);

// Prevents users from sending duplicate query parameters (parameter pollution attacks)
app.use(hpp());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Initialize Swagger documentation
setupSwagger(app);

export default app;
