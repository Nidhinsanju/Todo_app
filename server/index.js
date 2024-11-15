const express = require("express");
const mongoose = require("mongoose");
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

  // Check if the provided id is a valid number
  if (!id || typeof id !== "number") {
    return res.status(400).json({
      message: "Invalid User ID. Please provide a valid numeric ID.",
    });
  }

  // Check if TaskList is an array and has tasks
  if (!Array.isArray(TaskList) || TaskList.length === 0) {
    return res.status(400).json({
      message: "TaskList should be a non-empty array",
    });
  }

  try {
    // Find the user and user cart by CustomerId
    const user = await User.findOne({ CustomerId: id });
    const userCart = await Cart.findOne({ CustomerId: id });

    if (!user || !userCart) {
      return res.status(404).json({ message: "User or user cart not found" });
    }

    // Iterate through the TaskList array and handle each task
    for (const task of TaskList) {
      const { taskID, title, description, status, date } = task;

      // Validate task details
      if (
        !title ||
        typeof title !== "string" ||
        !description ||
        typeof description !== "string" ||
        typeof status !== "boolean" ||
        !date ||
        isNaN(Date.parse(date))
      ) {
        continue; // Skip this task if validation fails
      }

      // If taskID is provided, update the task; otherwise, create a new task
      if (taskID) {
        const existingTask = await Task.findOne({ TaskID: taskID });
        if (existingTask) {
          // Update the existing task
          await Task.updateOne(
            { TaskID: taskID },
            {
              $set: {
                Title: title,
                Description: description,
                status: status,
                date: date,
              },
            }
          );
        }
      } else {
        // Create a new task if taskID is not provided
        const newTaskID = Math.floor(Math.random() * 100); // Generate a random task ID
        const inputDate = new Date(date);
        const dateOnly = inputDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

        const newTask = {
          TaskID: newTaskID,
          CustomerId: id,
          Title: title,
          Description: description,
          status: status,
          date: dateOnly,
        };

        const taskInstance = new Task(newTask);
        await taskInstance.save();

        // Add the new task ID to the user's cart task list
        userCart.taskList.push(newTaskID);
        await userCart.save();
      }
    }

    // Send a single response after processing all tasks
    return res
      .status(200)
      .json({ message: "All tasks processed successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Internal Server Error", err: err.message });
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
