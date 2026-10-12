const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Siguraduhin na may 'npm install cors' ka
const mysql = require('mysql2');

const app = express();
app.use(cors()); // Eto yung importante para hindi ma-block ang browser
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lms_db'
});

db.connect((err) => {
  if (err) console.log("❌ DB ERROR:", err.message);
  else console.log("✅ DATABASE CONNECTED!");
});

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Registered!" });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: "Mali!" });
    res.json({ user: results[0] });
  });
});

server.listen(5000, () => console.log("🚀 Server on 5000"));