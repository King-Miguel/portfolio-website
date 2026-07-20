const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Serve static files from ALL directories
app.use(express.static('public'));
app.use(express.static('models'));  // Add this line
app.use(express.static('views'));   // Add this line
app.use(express.static('.'));       // Add this line (root directory)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'calcu.html'));
});

app.listen(PORT, () => {
  console.log(`🔥 Portfolio running on http://localhost:${PORT}`);
});