# React API Data Sample

## Table of Contents

[Introduction](#introduction)  
[Running the Demo with Docker](#running-the-demo-with-docker)  
[Demo Login Credentials](#demo-login-credentials)  
[Video Demo](#video-demo)  
[Technical Challenges](#technical-challenges)  
[Running the Backend Locally Without Docker](#running-the-backend-locally-without-docker)  
[Running the Frontend Locally Without Docker](#running-the-frontend-locally-without-docker)  
[Authentication](#authentication)  

## Introduction

This is a comprehensive code sample for a task creation and management app utilizing Node.js and Express.js for the backend and Next.js with Mantine UI and Tailwind CSS for the frontend. Both backend and frontend use TypeScript.

The backend is functional and uses PostgreSQL with Prisma ORM and Supabase.

Swagger documentation is automatically generated from the API description provided in `openapi.yaml` and is available at `/api-docs`.

The frontend UI allows users to display a list of tasks, create new tasks, and edit or delete existing tasks.

The backend includes a Task controller with CRUD operations: create, read (get all non-deleted tasks or get a task by ID), update, and soft-delete and a sample login route.

There are two sample CI workflows (`backend_ci.yml` and `frontend_ci.yml`) available in the `.github/workflows` directory. Each workflow is triggered automatically on a `git push` or pull request creation when either backend or frontend files are modified. They run ESLint and Prettier checks and unit tests. The backend includes sample unit tests for the Task controller.

You can spin up the whole project with Docker.

## Running the demo with Docker

To run the demo locally, please ensure that Docker and Docker Compose are installed on your machine. On macOS, you can install Docker Desktop which includes Docker Compose.

Check out the repository and run the following commands to spin up the whole project:

```bash
cd react-api-data-sample
cp .env.example .env
docker compose up --build
```

The frontend will be available at [http://localhost:3000](http://localhost:3000), the backend at [http://localhost:4000](http://localhost:4000), and the Swagger UI with the API docs at [http://localhost:4000/api-docs/](http://localhost:4000/api-docs/). The test PostgreSQL database will be created and seeded with sample data.

(If there are conflicts with previously run containers, `docker compose down -v` should fix it.)

## Demo Login Credentials

```plaintext
Email:
testuser@example.com

Password:
ReactDemo123
```

These credentials should be used for testing purposes only.

## Video Demo

React/Next.js UI:  
https://youtu.be/yViq7Q-s5TQ

## Technical Challenges

- So, the app is simple but I tried to keep the overall project setup (with useful NPM scripts, linter checks and architecture (UI libraries, auth, contexts) close to a real-world project.

- The backend part is rather straightforward. It has auth routes for authentication and auth validation with Supabase (the auth token is sent to client as a cookie), request validation with the express-validator library, and uses popular middleware. The DB schema is defined in `backend/prisma/schema.prisma`. There is a script to seed the DB with test data.

    The API docs UI is created with the help of Swagger parsing a YAML doc with the API description in OpenAPI format and runs locally at http://localhost:4000/api-docs/

- The frontend part is more interesting. It is built with Next.js, which is a React-based framework supporting server-side rendering. So, while it might be an overkill in case of a typical single-page application, like a dashboard, Next.js is a very useful tool when it comes to rendering SEO-optimized content fast (for example, on marketing websites).

    Also, Next.js can provide some benefits for rendering pages of a single-page app too, but it requires some adjustments from the simple client-side fetching with “Loading…” text my sample app uses right now. With Next.js, it is possible to render a “skeleton” of the app’s page very fast and then just stream data to the frontend from backend. And in case of regular client-side fetching in a real-world app I would prefer to use TanStack Query (former React Query), which was used in the previous project I worked on.

    The most challenging part of the current sample was making frontend libraries play well with Next.js and with each other because of their somewhat non-standard setup.

    Fortunately, Tailwind CSS, which I used for simple UI styling (like UI containers, spacing, etc.), works with Next.js out of the box.

    But I was recommended Mantine UI, which is used successfully in a couple of startups I know as a lightweight, highly customizable alternative to Material UI (which we used in ar my previous workplace). I learned that their developers are happy, the customers are happy, and decided to try Mantine in my code sample even though Material UI is a more mature solution.

    Since I didn’t work with Mantine before and only worked with Tailwind CSS a bit, I had to spend some time learning Mantine and figuring out how to make Mantine work with Next.js (because of server-side rendering) and how to make Mantine and Tailwind CSS work together and toggle light and dark themes with a single switch. So, I think now I got the hang of it.

    Besides, adding the popular React Hook Form library for managing Mantine form input elements (I had to use both controlled (fully manageable) and uncontrolled inputs because of how Mantine does it) and the Zod library for Mantine input validation also took some time and workarounds.

    Auth status and theme are provided across the app with Auth and Theme React contexts. Next.js middleware (which runs on the server) is used to validate auth before navigating to a route.

- There are also two simple GitHub workflows running linter checks and basic tests on git push or pull request, if a file in a corresponding folder changed.

## Running the Backend Locally Without Docker

To run the backend locally, follow these steps:

1. **Install Dependencies:**
    - Ensure you have Node.js v22.12.0 and npm installed.
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
    - In the backend root directory (`backend`), create a file named `.env` with the following content:

    ```plaintext
    # App
    PORT=4000
    FRONTEND_URL=http://localhost:3000
    
    # Supabase auth
    SUPABASE_URL=https://lmomvxdophesuqdghzpv.supabase.co
    SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtb212eGRvcGhlc3VxZGdoenB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5NTYwODUsImV4cCI6MjA1MTUzMjA4NX0.SgW7W43lOFF40TiG0Q-i5wSWM_b-6B6SAt7DXI5NVpI

    # PostgreSQL user (replace user and password with your PostgreSQL credentials)
    DATABASE_URL=postgresql://user:password@localhost:5432/task_db

    # Swagger UI
    ENABLE_SWAGGER=true
    ```
    **Security Notice:** The above Supabase credentials are for demonstration purposes only and should not be used for production. Ensure proper security configurations and avoid sharing real credentials publicly.

4. **Run Prisma Setup (Database & Client Generation):**
    - Initialize the database and apply migrations (this creates the `Task` table automatically):

    ```bash
    cd backend
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
    - Log in via the Login route in the Swagger UI with the demo login credentials. The cookie will be set and you will be able to access the other routes.

8. **Demo Login Credentials (for Testing Only):**
    ```plaintext
    Email:
    testuser@example.com

    Password:
    ReactDemo123
    ```

   These credentials should be used for testing purposes only.

9. To log out and clear the cookie, use the Logout route in the Swagger UI.

10. If you want to run the frontend locally, create the following `.env.local` and `.env.production` files in the frontend root directory:

    .env.local:

    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:4000
    ```

    .env.production:

    ```bash
    NEXT_PUBLIC_API_URL=https://api.yourdomain.com
    ```

    or just use `http://localhost:4000` for production too.

## Running the Frontend Locally Without Docker

To run the frontend locally, first make sure that the backend is running at `http://localhost:4000` and run the following commands from the root directory:

```bash
cd frontend
npm run build
npm run start
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Authentication

### How Authentication Works
- The backend uses HTTP cookies for authentication.
- When a user logs in with Supabase auth, the backend sets an `authToken` cookie containing the authentication token.
- All subsequent requests to protected endpoints require the `authToken` cookie.

### Logging In
To authenticate, send a `POST` request to `/api/auth/login` with the following JSON payload:

```json
{
  "email": "testuser@example.com",
  "password": "ReactDemo123"
}
```

- If authentication is successful, the response will include a `Set-Cookie` header with authToken.

- The client must store and send this cookie in all subsequent requests.

### Using Swagger UI with Cookie-Based Authentication

1. Navigate to [http://localhost:4000/api-docs](http://localhost:4000/api-docs).
2. Go to the POST `/api/auth/login` endpoint.
3. Enter the demo credentials and execute the request.
4. Once logged in, Swagger will automatically store the authentication cookie.
5. Now you can access protected routes like GET `/api/tasks` without manually setting an authorization token.
6. To log out, send a POST request to /api/auth/logout. This will clear the authentication cookie.

```bash
curl -X POST http://localhost:4000/api/auth/logout
```
