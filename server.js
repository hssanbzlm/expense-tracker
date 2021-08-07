const express = require("express");
const app = express();

app.use(express.static("./dist/expense-tracker"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/expense-tracker/" })
);

app.listen(process.env.PORT || 8080);
