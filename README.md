# Snippet Library Angular

An Angular frontend for creating, editing, searching, and managing code snippets.

## Features

- Create, edit, and delete snippets.
- Search snippets and browse paginated results.
- Receive toast feedback for successful and failed actions.
- Confirm before deleting a snippet.

## Requirements

- Node.js and npm.
- The Snippet Library API running at `http://localhost:3000`.

## Run locally

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the API at `http://localhost:3000`.

3. Start the frontend:

   ```sh
   npm start
   ```

4. Open `http://localhost:4200/`.

## Verify

Build the production app:

```sh
npm run build
```

Run unit tests:

```sh
npm test
```
