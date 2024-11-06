const mongoose = require("mongoose");

// Define mongoose schemas

const TaskSchema = new mongoose.Schema({
  TaskID: Number,
  Title: String,
  CustomerId: Number,
  Description: String,
  status: Boolean,
  date: {
    type: Date, // Date type for storing date and time values
    default: Date.now, // Optionally, set a default value to the current date
  },
});

const CartSchema = new mongoose.Schema({
  CustomerId: Number,
  taskList: [TaskSchema],
});

const UsersSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: String,
  password: String,
  CustomerId: Number,
  task: CartSchema,
});

// Define mongoose models
const User = mongoose.model("User", UsersSchema);
const Task = mongoose.model("Task", TaskSchema);
const Cart = mongoose.model("Cart", CartSchema);

module.exports = {
  User,
  Task,
  Cart,
};
