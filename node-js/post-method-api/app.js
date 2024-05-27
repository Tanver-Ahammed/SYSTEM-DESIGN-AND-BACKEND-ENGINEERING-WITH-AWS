const express = require("express");
const app = express();

app.use(express.json());

app.post("/signup/:id", (req, res) => {
  if (req.headers["api_key"] !== "kjmijmijmi") {
    return res.status(401).send("Unauthorized, Invalid API Key");
  }
  const { name, email, location, password } = req.body;
  console.log(req.params.id);
  console.log(req.query.age);
  console.log(name, email, location, password);
  console.log(req.headers["token"]);
  res.send("Hello from post method");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
