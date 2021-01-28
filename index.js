const express = require("express");
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Manthan" },
  { id: 2, name: "Adithya" },
  { id: 3, name: "Harshita" },
];

app.get("/", (req, res) => {
  res.send("hello world!!");
});

app.get("/ready", (req, res) => {
  res.send("message - ok");
});

var time = new Date().toLocaleTimeString();
app.get("/timenow", (req, res) => {
  res.send(`Time - ${time}`);
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.params.id));
  if (!user) res.status(404).send("user not found");
  res.send(user);
});

app.post("/users", (req, res) => {
  const user = { id: users.length + 1, name: req.body.name };
  users.push(user);
  res.send(user);
});

const port = process.env.port || 3000;
app.listen(3000, () => console.log(`Example app listening on port ${port}...`));
