import mongoose from "mongoose";
import express from 'express';
import Auth from '../middleware/auth.js';
import Authorize from '../middleware/authorize.js';
import Task from "../models/Tasks.js";

const router = express.Router();

router.get('/user', Auth, Authorize('user', 'admin'), (req, res) => {
    res.json({ message: "Welcome user!" })
});

router.get('/admin', Auth, Authorize('admin'), (req, res) => {
    res.json({ message: "Welcome admin!" })
});

router.get('/dashboard', Auth, (req, res) => {
    res.json({ message: `Welcome to the dashboard, user ${req.user.username}` });
});


router.get('/tasks', Auth, async (req, res) => {
    try {
        let tasks;
        if (req.user.role === "admin") {
            tasks = await Task.find().sort({ createdAt: -1 });
        }
        else {
            const userId = new mongoose.Types.ObjectId(req.user.id)
            tasks = await Task.find({ userId }).sort({ createdAt: -1 });
        }
        res.json(tasks);
    }

    catch (err) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }


});


router.post("/tasks", Auth, async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const userId = new mongoose.Types.ObjectId(req.user.id);

        const task = await Task.create({
            title,
            userId,
        });

        res.status(201).json(task);
    } catch (err) {
        console.error("POST /tasks error:", err);
        res.status(500).json({ message: "Failed to create task" });
    }
});


router.put('/tasks/:id', Auth, async (req, res) => {
    try {

        const { title, status } = req.body;
        const userId = req.user.id || req.user._id;

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId },
            { title, status },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Failed to update task" });
    }
});

router.delete('/tasks/:id', Auth, async (req, res) => {
    try {

        const userId = req.user.id || req.user._id;

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId,

        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete task" });
    }

});
export default router;