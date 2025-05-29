const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

let books = [];
let nextId = 1;

// GET 
app.get('/books', (req, res) => {
  res.json(books);
});

// POST 
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and Author are required' });
  }

  const newBook = {
    id: nextId++,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT 
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  books.splice(index, 1);
  res.json({ message: 'Book deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
