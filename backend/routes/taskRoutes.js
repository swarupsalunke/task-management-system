const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// ✅ import controller functions
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// ✅ routes (clean & readable)
router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.get("/:id", auth, getTaskById);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;