const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { User, Task, Cart } = require("./DB/index");
const { AuthToken, deCryptAuth } = require("./Auth/index");

const cors = require("cors");

const tokenString =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNzMwMTM2OTQ5fQ.xMIc3Qp6JUiPQWx-lOrii0zDsvD5T4CSEdImKLBcRHQ";

const uri = process.env.DATABASEURL;

deCryptAuth(tokenString);
AuthToken();

const app = express();

app.use(cors());
app.use(express.json());

const port = 8000;

mongoose.connect(uri, {
  dbName: "ToDoApp",
});

app.post("/user-login/", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(403).json({
        message: "Please provide email and password",
      });
    }
    if (email && password) {
      try {
        const user = await User.findOne({ email: email, password: password });
        if (!user) {
          res.status(404).json({ message: "Invalid email or password" });
        } else {
          res.status(200).json({ message: "User exisits", user });
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/user-signup/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!email || !password || !firstName || !lastName) {
      res.status(403).json({
        message: "Please provide all the required fields",
      });
    } else {
      const ExisitingUser = await User.findOne({ email: email });
      if (!ExisitingUser) {
        const customerId = Math.random();
        const user = new User({
          firstName,
          lastName,
          email,
          password,
          customerId,
        });

        const cart = new Cart({
          CustomerId: customerId,
          taskList: [],
        });

        await cart.save();
        await user.save();
        res.status(201).json({ message: "User created successfully" });
      } else {
        res.status(404).json({ message: "User already exists" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/", (req, res) => {
  console.log(req, "this is the request");
  console.log(res, "this is the response");
  const object = {
    id: 1,
    name: "John Doe",
    age: 30,
  };

  res.status(200).json({ message: "getting response", object });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
