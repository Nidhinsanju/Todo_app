const mongoose = require("mongoose");

// Define mongoose schemas

const TaskSchema = new mongoose.Schema({
  TaskID: Number,
  Title: String,
  CustomerId: Number,
  Description: String,
  status: Boolean,
  date: {
    type: String, // Store as string in format YYYY-MM-DD
    required: true,
  },
});

const CartSchema = new mongoose.Schema({
  CustomerId: Number,
  taskList: [Number], // This should define `taskList` as an array of numbers
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
