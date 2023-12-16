const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

app.get("/", async (req, res) => {
  res.json({ status: "Ready!!" });
});

app.get("/:batik", async (req, res) => {
  const query = "SELECT * FROM data_batik WHERE nama_batik = ?";
  pool.query(query, [req.params.batik], (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not Found!" })
    } else {
      res.json(results[0])
    }
  })
});

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.DB_USER}`,
});