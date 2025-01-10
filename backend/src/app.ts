/**
 * Entry point for the Express application. Sets up routes and middleware.
 * OpenAPI alignment: Sets up all routes and Swagger UI as specified in openapi.yaml
 */
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import { setupSwagger } from './swagger.js';

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Initialize Swagger documentation
setupSwagger(app);

export default app;
