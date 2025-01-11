/**
 * Swagger UI setup for serving API documentation from openapi.yaml.
 * Matches the structure defined in openapi.yaml
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';

// Convert import.meta.url to usable file paths in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the openapi.yaml file using the corrected __dirname handling
const file = fs.readFileSync(path.resolve(__dirname, './openapi.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);

/**
 * Sets up Swagger UI for API documentation based on the openapi.yaml file.
 * @param app - The Express application instance.
 */
export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
