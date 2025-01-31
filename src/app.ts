const morgan = require("morgan");
const express = require('express')
const port = 3000;

const app = express()
app.use(express.json())
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});