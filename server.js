const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "order",
  port: 3306
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected");
});

// ===================== ORDER API =====================
app.post("/order", (req, res) => {
  console.log("📦 Received order:", req.body);

  const { name, mobile, food, location } = req.body;

  if (!name || !mobile || !food || !location) {
    return res.status(400).json({
      success: false,
      message: "Missing fields"
    });
  }

  const sql =
    "INSERT INTO user_orders (name, mobile, food, location) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, mobile, food, location], (err, result) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    return res.status(200).json({
      success: true,
      orderId: result.insertId
    });
  });
});
// =====================================================

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
