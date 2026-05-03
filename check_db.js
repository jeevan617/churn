const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'churn.db');

console.log(`🔍 Checking database at: ${dbPath}\n`);

try {
  const db = new Database(dbPath, { readonly: true });
  console.log('✅ Successfully connected to the database.\n');

  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  
  if (tables.some(t => t.name === 'users')) {
      console.log('--- 👤 Users ---');
      const users = db.prepare('SELECT id, name, email, created_at FROM users').all();
      console.table(users);
  }
  
  if (tables.some(t => t.name === 'feedbacks')) {
      console.log('\n--- 💬 Feedbacks ---');
      const feedbacks = db.prepare('SELECT * FROM feedbacks').all();
      console.table(feedbacks);
  }

  if (tables.some(t => t.name === 'predictions')) {
      console.log('\n--- 📊 Predictions ---');
      const predictions = db.prepare('SELECT * FROM predictions').all();
      console.log(predictions);
  }

  db.close();
} catch (err) {
  console.error('❌ Error connecting to the database:', err.message);
}
