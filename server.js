const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory store
let todos = [
  { id: 1, text: 'Build a CI/CD pipeline on AWS', completed: false },
  { id: 2, text: 'Push this app to GitHub', completed: false },
  { id: 3, text: 'Deploy to EC2', completed: false },
];
let nextId = 4;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET - Home
app.get('/', (req, res) => {
  const filter = req.query.filter || 'all';
  let filtered = todos;
  if (filter === 'active') filtered = todos.filter(t => !t.completed);
  if (filter === 'completed') filtered = todos.filter(t => t.completed);

  res.render('index', {
    todos: filtered,
    filter,
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  });
});
// updated
// POST - Add todo
app.post('/add', (req, res) => {
  const text = req.body.text?.trim();
  if (text) {
    todos.push({ id: nextId++, text, completed: false });
  }
  res.redirect('/');
});

// POST - Toggle todo
app.post('/toggle/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (todo) todo.completed = !todo.completed;
  res.redirect(req.headers.referer || '/');
});

// POST - Delete todo
app.post('/delete/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.redirect(req.headers.referer || '/');
});

// POST - Clear completed
app.post('/clear-completed', (req, res) => {
  todos = todos.filter(t => !t.completed);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Todo app running on http://localhost:${PORT}`);
});