/**
 * Entry point for the Express application. Sets up routes and middleware.
 * OpenAPI alignment: Sets up all routes and Swagger UI as specified in openapi.yaml
 */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import { setupSwagger } from './swagger.js';

const app = express();

// const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// app.use(
//   cors({
//     origin: `http://localhost:${PORT}`,
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'X-Requested-With'],
//   })
// );
app.use(cookieParser());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Initialize Swagger documentation
setupSwagger(app);

export default app;
