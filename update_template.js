// Endpoint to update an existing template
app.put('/api/templates/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const content = req.body.content;

  if (!name || !content) {
    return res.status(400).send('Name and content are required');
  }

  try {
    const result = await db.run(
      'UPDATE templates SET name = ?, content = ? WHERE id = ?',
      [name, content, id]
    );
    if (result.changes === 0) {
      return res.status(404).send('Template not found');
    }
    return res.send('Template updated');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
});