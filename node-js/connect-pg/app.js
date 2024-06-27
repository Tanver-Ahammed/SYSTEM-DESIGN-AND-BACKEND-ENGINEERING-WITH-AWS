const express = require("express");
const db = require("./db");

const app = express();
const port = 3000;

// http://localhost:3000/
app.get("/", (req, res) => {
  db.query("SELECT NOW()", [], (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.status(500).send("Internal Server Error");
    } else {
      res.send("Current time: " + result.rows[0].now);
    }
  });
});

// http://localhost:3000/employee/19016?dept=ICT
app.get("/students", (req, res) => {
  db.query("SELECT * FROM student", (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(result.rows);
    }
  });
});

app.listen(port, () => {
  console.log("Server started....Listening at http://localhost:3000");
});
