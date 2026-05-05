const Task = require("../models/Task");

// ✅ CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;

    if (!title || !description || !dueDate || !category) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const task = await Task.create({
      ...req.body,
      user: req.user.id
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET SINGLE TASK
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found or unauthorized" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found or unauthorized" });
    }

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};