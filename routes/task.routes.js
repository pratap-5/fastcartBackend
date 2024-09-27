import express from "express";
import {
  createtask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controler.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", protectRoute, createtask);
router.put("/tasks/:task_id", protectRoute, updateTask);
router.delete("/tasks/:task_id", protectRoute, deleteTask);

export default router;
