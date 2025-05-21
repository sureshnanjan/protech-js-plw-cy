// app.js - Main application file

// Import required modules
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static('public')); // Serve static files from 'public' directory

// File path for storing todos
const todosFilePath = path.join(__dirname, 'data', 'todos.json');

// Ensure the data directory exists
async function ensureDataDir() {
  const dataDir = path.join(__dirname, 'data');
  try {
    await fs.access(dataDir);
  } catch (error) {
    // Directory doesn't exist, create it
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Function to read todos from file
async function readTodos() {
  try {
    await ensureDataDir();
    
    const data = await fs.readFile(todosFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or other error, return empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading todos:', error);
    throw error;
  }
}

// Function to write todos to file
async function writeTodos(todos) {
  await ensureDataDir();
  await fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2), 'utf8');
}

// API Routes

// GET /api/todos - Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await readTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve todos' });
  }
});

// POST /api/todos - Create a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Todo text is required' });
    }
    
    const todos = await readTodos();
    
    // Create new todo with a unique ID
    const newTodo = {
      id: Date.now().toString(), // Simple unique ID using timestamp
      text: text.trim(),
      completed: false
    };
    
    todos.push(newTodo);
    await writeTodos(todos);
    
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /api/todos/:id - Toggle todo completion status
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await readTodos();
    
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    // Toggle completed status
    todos[todoIndex].completed = !todos[todoIndex].completed;
    
    await writeTodos(todos);
    res.json(todos[todoIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await readTodos();
    
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    
    await writeTodos(todos);
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
