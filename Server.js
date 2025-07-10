const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// In-memory data
let items = [
  { id: 1, name: "Biro", description: "Blue ink biro" },
  { id: 2, name: "Leda", description: "Plastic bag" }
];

// Routes
app.get('/', (req, res) => {
  res.send("Hello, World!");
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

app.post('/items', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) return res.status(400).json({ error: "Missing fields" });

  const newItem = {
    id: items.length + 1,
    name,
    description
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });

  const { name, description } = req.body;
  item.name = name || item.name;
  item.description = description || item.description;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Item not found" });

  const deleted = items.splice(index, 1);
  res.json({ deleted });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

