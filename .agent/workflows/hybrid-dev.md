---
description: Run Backend in Docker and Frontend Locally
---

This workflow allows you to run the Backend and Database in Docker containers while running the Frontend locally for fast development (hot-reloading).

## 1. Start Backend & Database (Docker)
Run the following command in the root directory to start the backend and postgres services.

```bash
docker compose up -d backend
```
> **Note**: This will automatically start `postgres` as well because the backend depends on it.
> The backend will be available at `http://localhost:3000`.

## 2. Start Frontend (Local)
Open a **new terminal**, navigate to the frontend directory, and start the vite dev server.

```bash
cd me_lleva_la_burger_front
npm install # Only if you haven't installed dependencies yet
npm run dev
```
> The frontend will be available at `http://localhost:5173` (or similar).

## 3. Stopping Services
To stop the backend when you are done:

```bash
docker compose down
```
