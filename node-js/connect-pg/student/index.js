const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/all-students", (req, res) => {
  res.send("all data");
});

// http://localhost:3000/
router.get("/", (req, res) => {
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
router.get("/students", (req, res) => {
  db.query("SELECT * FROM student", (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(result.rows);
    }
  });
});

module.exports = router;
