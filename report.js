// Endpoint to get all templates
app.get('/api/templates', (req, res) => {
  // Query the database to get all templates
  db.all('SELECT * FROM templates', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(rows);
  });
});

// Endpoint to get a specific template by ID
app.get('/api/templates/:id', (req, res) => {
  const { id } = req.params;

  // Query the database to get the template with the specified ID
  db.get('SELECT * FROM templates WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: `Template with ID ${id} not found` });
      return;
    }

    res.json(row);
  });
});

// Endpoint to create a new template
app.post('/api/templates', (req, res) => {
  const { name, fields } = req.body;

  // Insert the new template into the database
  db.run('INSERT INTO templates (name, fields) VALUES (?, ?)', [name, JSON.stringify(fields)], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({ id: this.lastID });
  });
});

// Endpoint to update an existing template
app.put('/api/templates/:id', (req, res) => {
  const { id } = req.params;
  const { name, fields } = req.body;

  // Update the template in the database
  db.run('UPDATE templates SET name = ?, fields = ? WHERE id = ?', [name, JSON.stringify(fields), id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: `Template with ID ${id} not found` });
      return;
    }

    res.json({ message: 'Template updated successfully' });
  });
});

// Endpoint to delete a template
app.delete('/api/templates/:id', (req, res) => {
  const { id } = req.params;

  // Delete the template from the database
  db.run('DELETE FROM templates WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: `Template with ID ${id} not found` });
      return;
    }

    res.json({ message: 'Template deleted successfully' });
  });
});

// Endpoint to get all reports
app.get('/api/reports', (req, res) => {
  // Query the database to get all reports
  db.all('SELECT * FROM reports', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(rows);
  });
});

// Endpoint to get a specific report by ID
app.get('/api/reports/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM reports WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else if (row) {
      res.send(row);
    } else {
      res.status(404).send('Report not found');
    }
  });
});
