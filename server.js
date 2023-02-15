const db = require('./database');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const pdf = require('html-pdf');

const app = express();
const port = process.env.PORT || 5000;

// Allow cross-origin resource sharing
app.use(cors());

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Serve your API routes
app.get('/api/templates', (req, res) => {
  // Your logic for fetching templates goes here
});

app.post('/api/templates', (req, res) => {
  // Your logic for creating a new template goes here
});

app.put('/api/templates/:id', (req, res) => {
  // Your logic for updating an existing template goes here
});

app.delete('/api/templates/:id', (req, res) => {
  // Your logic for deleting a template goes here
});

app.post('/api/templates/export', (req, res) => {
  // Your logic for generating a PDF report from a template goes here
  // You can use the `html-pdf` library to convert the HTML template to PDF
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));