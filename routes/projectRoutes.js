import express from "express";
import Project from "../models/Project.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, async (req, res) => {
  const { name, members } = req.body;

  const project = await Project.create({
    name,
    members,
    createdBy: req.user.id
  });

  res.json(project);
});

router.get("/", protect, async (req, res) => {
  const projects = await Project.find().populate("members");
  res.json(projects);
});

export default router;