# Backend README

This backend is an Express + MongoDB API for the to-do list application.

## Prerequisites

- Node.js 20+ recommended
- npm
- A MongoDB connection string, either from MongoDB Atlas or a local MongoDB instance

Tested in this workspace with Node.js `v22.17.1`.

## Setup

1. Open a terminal in the `Server` folder.
2. Install dependencies:

```bash
npm install
```

If PowerShell blocks `npm` because of execution policy, use:

```bash
npm.cmd install
```

3. Create a `.env` file in `Server` with your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/todolist?retryWrites=true&w=majority
```

## Run The Backend

Start the server with:

```bash
npm start
```

If needed on Windows PowerShell:

```bash
npm.cmd start
```

The API listens on `http://localhost:5000`.

## MongoDB Connection Notes

- MongoDB Atlas:
  Use an Atlas connection string in `MONGO_URI`.
- If you use Atlas, make sure your current IP address is allowed in Network Access.
- It is best to include a database name in the URI, such as `/todolist`, so your data does not end up in MongoDB's default test database.
- Local MongoDB:
  A typical local connection string looks like `mongodb://127.0.0.1:27017/todolist`.
- Do not commit real database credentials to version control.

## Backend Assumptions And Limitations

- The backend expects `MONGO_URI` to exist in `Server/.env`.
- The server port is hardcoded to `5000`; there is no `PORT` environment variable support yet.
- CORS is open to all origins.
- There is no authentication or authorization.
- Validation is minimal and mainly checks that the task name is not empty.
- There are no automated tests configured yet.
