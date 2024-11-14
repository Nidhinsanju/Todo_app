const express = require("express");
const mongoose = require("mongoose");
const isAlphanumeric = require("./functions/isAlphanumeric");
require("dotenv").config();
const { User, Task, Cart } = require("./DB/index");
const { authToken, SecretKey } = require("./Auth/index");
const jwt = require("jsonwebtoken");
var cors = require("cors");

const uri = process.env.DATABASEURL;

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
      return res.status(403).json({
        message: "Please provide email and password",
      });
    }
    if (email && password) {
      try {
        const user = await User.findOne({ email: email, password: password });
        if (!user) {
          return res.status(404).json({ message: "Invalid email or password" });
        } else {
          const token = jwt.sign({ email: email, role: "user" }, SecretKey, {
            expiresIn: "2hr",
          });
          return res.status(200).json({
            message: "Logged in Sucessfully",
            user: user,
            token: token,
          });
        }
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.post("/user-signup/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!email || !password || !firstName || !lastName) {
      return res.status(403).json({
        message: "Please provide all the required fields",
      });
    } else {
      const ExisitingUser = await User.findOne({ email: email });
      if (!ExisitingUser) {
        const customerId = Math.floor(Math.random() * 100) + 1;
        const newCustomer = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          CustomerId: customerId,
        };
        const user = new User(newCustomer);
        await user.save();

        const cart = new Cart({
          CustomerId: customerId,
          taskList: [],
        });

        await cart.save();
        return res.status(201).json({ message: "User created successfully" });
      } else {
        return res
          .status(404)
          .json({ message: "User already exists with this Email Address" });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.post("/task-list/", authToken, async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (typeof id == "string") {
      return res.status(403).json({ message: "id must be a Number" });
    }
    if (id) {
      try {
        const task = await Cart.findOne({ CustomerId: id });
        const tasks = {
          taskList: task.taskList,
          CustomerId: task.CustomerId,
        };
        if (tasks !== null) {
          return res
            .status(200)
            .json({ message: "Cart successfully", data: tasks });
        }
        res.status(403).json({ message: "Customer ID not found in any cart" });
      } catch (err) {
        return res
          .status(500)
          .json({ message: "internal Server Error", err: err.message });
      }
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", err: err.message });
  }
});

app.post("/add-task/", authToken, async (req, res) => {
  const { id, TaskList } = req.body;
  const result = isAlphanumeric(id);
  try {
    if (result) {
      return res.status(403).json({ message: "id must be a Number" });
    }
    // Validate User ID
    if (!id || typeof id === "string") {
      return res.status(400).json({
        message: "Invalid User ID. Please provide a valid numeric ID.",
      });
    }

    // Validate TaskList
    if (!TaskList || typeof TaskList !== "object") {
      return res
        .status(400)
        .json({ message: "TaskList data is required and must be an object." });
    }

    const { title, description, status, date } = TaskList;

    // Validate title
    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ message: "Task title is required and must be a string." });
    }

    // Validate description
    if (!description || typeof description !== "string") {
      return res.status(400).json({
        message: "Task description is required and must be a string.",
      });
    }

    // Validate status
    if (typeof status !== "boolean") {
      return res
        .status(400)
        .json({ message: "Task status is required and must be a boolean." });
    }

    // Validate date format
    if (!date || isNaN(Date.parse(date))) {
      return res.status(400).json({
        message: "Invalid date format. Please use a valid date (YYYY-MM-DD).",
      });
    }

    // Find the user and user cart
    const user = await User.findOne({ CustomerId: id });
    const userCart = await Cart.findOne({ CustomerId: id });
    if (!userCart) {
      return res.status(404).json({ message: "User not found in any cart" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Create task ID
    const taskID = Math.floor(Math.random() * 100);

    // Parse date to store only the date part (YYYY-MM-DD)
    const inputDate = new Date(date);
    const dateOnly = inputDate.toISOString().split("T")[0]; // '2024-11-11'

    const newTask = {
      TaskID: taskID,
      CustomerId: id,
      Title: TaskList.title,
      Description: TaskList.description,
      status: TaskList.status,
      date: dateOnly,
    };

    // Save task and update cart
    const task = new Task(newTask);
    await task.save();

    userCart.taskList.push(taskID);
    await userCart.save();

    await user.save(); // Save user (though not necessary unless you want to update something)

    return res
      .status(201)
      .json({ message: "Task added successfully", newTask });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Internal Server Error", err: err.message });
  }
});

app.post("/task-update/", authToken, async (req, res) => {
  const { id, TaskList } = req.body;
  try {
    const user = await User.findOne({ CustomerId: id });
    if (!user) {
      return res.status(200).json({ message: "User Id not found" });
    }
    const userCart = await Cart.findOne({ CustomerId: id });
    if (!userCart) {
      return res.status(200).json({ message: "User not found in any cart" });
    }
    const taskID = TaskList.taskID;
    if (!taskID) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    const ExisitingTask = await Task.findOne({ TaskID: taskID });
    if (!ExisitingTask) {
      return res.status(404).json({ message: "Task ID invalid" });
    } else {
      const { title, description, status, date } = TaskList;
      await Task.updateOne(
        { TaskID: taskID }, // Filter: find the task by TaskID
        {
          $set: {
            Title: title,
            Description: description,
            status: status,
            date: date,
          },
        } // Update only specified fields
      );
      return res.status(200).json({ message: "Task updated successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
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

app.delete("/delete-user", authToken, async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const user = await User.findOne({ CustomerId: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userCart = await Cart.findOne({ CustomerId: id });
    if (!userCart) {
      return res.status(404).json({ message: "User not found in any cart" });
    }
    await Task.deleteMany({ CustomerId: id });
    await Cart.deleteOne({ CustomerId: id });
    await user.deleteOne();
    return res
      .status(200)
      .json({ message: "User and associated tasks deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
