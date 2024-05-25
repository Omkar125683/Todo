    const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ dueDate: -1 }); // Sort by dueDate in ascending order
      res.json(tasks);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });

// GET a task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  try {
    console.log(status)
    const newTask = new Task({ title, description, status, dueDate });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
    console.log(err);
  }
});

// PUT update a task by ID
router.put('/:id', async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const updatedTask = { title, description, status, dueDate };

  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    task = await Task.findByIdAndUpdate(req.params.id, updatedTask, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// DELETE a task by ID
router.delete('/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
router.patch('/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      task.status = req.body.status;
      await task.save();
      res.send(task);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
module.exports = router;
