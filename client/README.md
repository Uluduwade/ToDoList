# Frontend README

This frontend is a React + Vite app for managing to-do items.

## Prerequisites

- Node.js 20+ recommended
- npm

Tested in this workspace with Node.js `v22.17.1`.

## Setup

1. Open a terminal in the `client` folder.
2. Install dependencies:

```bash
npm install
```

If PowerShell blocks `npm` because of execution policy, use:

```bash
npm.cmd install
```

## Run The App

Start the Vite development server:

```bash
npm run dev
```

If needed on Windows PowerShell:

```bash
npm.cmd run dev
```

Vite usually serves the app at `http://localhost:5173`.

## Frontend Assumptions And Limitations

- The frontend is hardcoded to call the backend at `http://localhost:5000/api/tasks`.
- The backend must be running before the UI can load or save tasks.
- There is no frontend environment variable for the API base URL yet.
- Task reordering with the Up/Down buttons only changes the order in the current browser state. It is not saved to MongoDB.
- There is no authentication, user management, or route protection.
- Error handling is minimal, so API failures are mostly logged to the browser console.
