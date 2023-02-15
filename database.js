const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db'), (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    template TEXT
  )`);
});

module.exports = db;