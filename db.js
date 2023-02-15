const CREATE_TEMPLATES_TABLE = `
  CREATE TABLE templates (
    id INTEGER PRIMARY KEY,
    name TEXT,
    fields TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.run(CREATE_TEMPLATES_TABLE, (err) => {
  if (err) {
    console.log('Error creating templates table', err.message);
  } else {
    console.log('Templates table created successfully');
  }
});
