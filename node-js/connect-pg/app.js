const express = require("express");
const db = require("./db");
const student = require("./student");

const app = express();
const port = 3000;

app.use("/api", student);

app.listen(port, () => {
  console.log("Server started....Listening at http://localhost:3000");
});
