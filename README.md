# React API Data Sample

## Table of Contents

[Introduction](#introduction)  
[Known Limitations](#known-limitations)  
[Demo](#demo)  
[Running the Backend Locally](#running-the-backend-locally)  
[Pre-Populated Tasks](#pre-populated-tasks)

## Introduction

This is a comprehensive code sample for a task creation and management app utilizing Node.js and Express.js for the backend and Next.js with Mantine UI and TailwindCSS for the frontend. Both backend and frontend use TypeScript.

The backend is functional and uses PostgreSQL with Prisma ORM and Supabase.

Swagger documentation is automatically generated from the API description provided in `openapi.yaml` and is available at `/api-docs`.

The sample currently includes a working backend. The frontend is a placeholder and will be updated soon.

The backend includes a Task controller with CRUD operations: create, read (get all non-deleted tasks or get a task by ID), update, and soft-delete and a sample login route.

There are two sample CI workflows (`backend_ci.yml` and `frontend_ci.yml`) available in the `.github/workflows` directory. Each workflow is triggered automatically on a `git push` or pull request creation when either backend or frontend files are modified. They run ESLint and Prettier checks and unit tests. The backend includes sample unit tests for the Task controller.

The complete project with frontend and backend will be dockerized and available for local development with a single command after the weekend!

## Demo

Video demo of the backend API running in the Swagger UI:

[![Backend API Demo](https://img.youtube.com/vi/5c4tpK_mZNo/0.jpg)](https://www.youtube.com/watch?v=5c4tpK_mZNo)

## Known Limitations

- The frontend is a placeholder and will be updated soon. Some components were added to demonstrate the basic structure of the app along with Prettier and ESLint configurations.

- The backend is not yet dockerized.

- Since the mapper utility functions, TypeScript model files, and DTOs are shared between the backend and frontend, it would be ideal to move them to a shared package for a single source of truth. However, to keep this sample project simple and allow the backend and frontend to be built completely independently, they are currently kept separate in their respective directories. In a real-world project, the shared package approach would be more appropriate, following the DRY principle.

## Running the Backend Locally

To run the backend locally, follow these steps:

1. **Install Dependencies:**
    - Ensure you have Node.js and npm installed.
    - Navigate to the backend's root directory (where `package.json` is located).
    - Run:

    ```bash
    npm install
    ```
2. **Configure PostgreSQL:**
   - Install PostgreSQL if not already installed.
   - Create a database named `task_db`.
   - Note the database name, user, and password for the `.env` file.

3. **Create an `.env` File:**
    - In the backend root directory, create a file named `.env` with the following content:

    ```plaintext
    # Supabase auth
    SUPABASE_URL=https://lmomvxdophesuqdghzpv.supabase.co
    SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtb212eGRvcGhlc3VxZGdoenB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5NTYwODUsImV4cCI6MjA1MTUzMjA4NX0.SgW7W43lOFF40TiG0Q-i5wSWM_b-6B6SAt7DXI5NVpI

    # PostgreSQL user
    DATABASE_URL=postgresql://user:password@localhost:5432/task_db
    ```
    **Security Notice:** The above Supabase credentials are for demonstration purposes only and should not be used for production. Ensure proper security configurations and avoid sharing real credentials publicly.

4. **Run Prisma Setup (Database & Client Generation):**
    - Initialize the database and apply migrations (this creates the `Task` table automatically):

    ```bash
    npm run prisma:migrate
    ```
    - Generate the Prisma Client for interacting with the database:

    ```bash
    npm run prisma:generate
    ```
    - Seed the `Task` table with sample data using provided `seed.ts` script:

    ```bash
    npm run prisma:seed
    ```
     If anything doesn't work as expected, check your PostgreSQL database user credentials in the `.env` file.

5. **Start the Backend:**
    - Run the following commands:

    ```bash
    # Development
    npm run dev

    # Production
    npm run build
    npm run start
    ```

6. **Access the Application:**
    - API Base URL: [http://localhost:4000](http://localhost:4000)
    - Swagger API Documentation: [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

7. **Authenticating in Swagger:**
    - First log in via the Login route in the Swagger UI with the demo login credentials. Copy the token you receive in case of successful login.
    - Click the `Authorize` button on the Swagger UI.
    - Enter the token you received in the `Value` field and click `Authorize`.

8. **Demo Login Credentials (for Testing Only):**
    - **Login:** demo@example.com
    - **Password:** password123

   These credentials should be used for testing purposes only. Do not include sensitive data in the tasks you create.

## Pre-Populated Tasks

- Tasks with `id < 11` are considered **read-only** and cannot be:
    - Deleted
    - Updated

- The API returns a `readOnly` flag to help the frontend disable actions on such tasks.

- Example API Response:

```json
{
    "id": 5,
    "title": "Sample Task",
    "readOnly": true
}
```

---

**Next Steps:** The project will soon be dockerized for easier local setup with a single command!