/**
 * Main server file. Imports the app configuration and starts the server.
 * Matches the OpenAPI server URL defined in openapi.yaml
 */

import './config/env.js'; // Load env variables before anything else

import app from './app.js';

const PORT = process.env.PORT || 4000;

// Initialize the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  if (process.env.ENABLE_SWAGGER === 'true') {
    console.log(`Swagger UI available at ${PORT}/api-docs`);
  }
});
