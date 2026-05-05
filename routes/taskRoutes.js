import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

router.get("/", protect, async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo")
    .populate("project");

  res.json(tasks);
});

router.patch("/:id", protect, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);
});

export default router;