const express = require("express");
const mongoose = require("mongoose");

const uri =
  "";

const app = express();

app.use(express.json());

const port = 3000;

mongoose.connect(uri, {
  dbName: "ToDoApp",
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
