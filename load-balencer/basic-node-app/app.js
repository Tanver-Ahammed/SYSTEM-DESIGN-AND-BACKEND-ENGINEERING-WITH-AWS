const express = require("express");
const os = require("os");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(
    `[${new Date().toISOString()}] Received request from ${os.hostname()} From ${
      req.ip
    }`
  );
  res.send(
    `[${new Date().toISOString()}] Received request from ${os.hostname()} From ${
      req.ip
    }`
  );
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
