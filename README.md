# Taskly - Todo App

A clean, minimal todo app built with Node.js, Express, and EJS.

## Stack
- **Node.js** + **Express** — backend
- **EJS** — templating
- **In-memory storage** — no database needed

## Run Locally

```bash
npm install
npm start
```

App runs at `http://localhost:3000`

## Features
- Add, complete, and delete todos
- Filter by All / Active / Done
- Clear all completed at once

## Project Structure
```
todo-app/
├── server.js         # Express app
├── views/
│   └── index.ejs     # Main template
├── public/
│   └── css/
│       └── style.css # Styles
├── package.json
└── .gitignore
```