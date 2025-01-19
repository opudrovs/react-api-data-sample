/**
 * Swagger UI setup for serving API documentation from openapi.yaml.
 * Matches the structure defined in openapi.yaml
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Express } from 'express';
import { RequestInit } from 'node-fetch';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';

// Convert import.meta.url to usable file paths in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Sets up Swagger UI for API documentation based on the openapi.yaml file.
 * @param app - The Express application instance.
 */
export const setupSwagger = (app: Express) => {
  if (process.env.ENABLE_SWAGGER !== 'true') {
    return;
  }

  const file = fs.readFileSync(
    path.resolve(__dirname, './openapi.yaml'),
    'utf8'
  );
  const swaggerDocument = YAML.parse(file);

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        withCredentials: true,
        requestInterceptor: (req: RequestInit) => {
          if (!req.headers) {
            req.headers = {};
          }

          // Handle different possible header formats
          if (req.headers instanceof Headers) {
            req.headers.set('X-Requested-With', 'XMLHttpRequest');
          } else if (Array.isArray(req.headers)) {
            req.headers.push(['X-Requested-With', 'XMLHttpRequest']);
          } else {
            (req.headers as Record<string, string>)['X-Requested-With'] =
              'XMLHttpRequest';
          }

          return req;
        },
      },
    })
  );
};
