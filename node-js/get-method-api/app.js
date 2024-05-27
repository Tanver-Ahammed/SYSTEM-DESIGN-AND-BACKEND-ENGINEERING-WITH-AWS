const express = require("express");
const app = express();

// http://localhost:3000/student?id=19016&dept=ict
app.get("/student", (req, res) => {
  const id = req.query.id;
  const dept = req.query.dept;
  console.log(req);
  console.log(dept);
  const result = {
    id: "1906",
    name: "Tanver",
    salary: "50000",
    dept: "Engineering",
  };
  if (id) res.send(result);
  else res.send("Can't Response...");
});

// http://localhost:3000/employee/:19016?dept=ICT
app.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const dept = req.query.dept;
  const result = {
    id: id,
    dept: dept,
  };
  res.send(result);
});

app.listen(3000, () => {
  console.log("Started....");
});
