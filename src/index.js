const express = require("express");
const app = express();
const serverless = require("serverless-http");

const router = express.Router();

const users = [
  { id: 1, name: "Manthan" },
  { id: 2, name: "Adithya" },
  { id: 3, name: "Harshita" },
];

router.get("/", (req, res) => {
  res.json("hello world!!");
});

router.get("/ready", (req, res) => {
  res.json({ message: "ok" });
});

var time = new Date().toLocaleTimeString();
router.get("/timenow", (req, res) => {
  res.json({ time: `${time}` });
});

router.get("/users", (req, res) => {
  res.json(users);
});

router.get("/users/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.params.id));
  if (!user) res.status(404).send("user not found");
  res.json(user);
});

const port = process.env.port || 3000;
app.listen(3000, () => console.log(`Example app listening on port ${port}...`));

app.use("/.netlify/functions/index", router);

module.exports.handler = serverless(app);
