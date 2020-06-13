const express = require('express');
const router = new express.Router();
const { Task } = require('../models');
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.sendStatus(400);
  }
});

// GET /tasks?page=&limit=&sortBy=&sortOrder=
router.get('/tasks', auth, async (req, res) => {
  const filter = {
    owner: req.user._id
  };
  const projection = null;
  const options = {};

  if (req.query.completed) {
    filter.completed = req.query.completed;
  }

  if (req.query.page && req.query.limit) {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    options.skip = (page - 1) * limit;
    options.limit = limit;
  }

  if (req.query.sortBy) {
    let sortOrder = 'asc';

    if (
      req.query.sortOrder &&
      ['asc', 'desc'].includes(req.query.sortOrder.toLowerCase())
    ) {
      sortOrder = req.query.sortOrder.toLowerCase();
    }

    options.sort = {
      [req.query.sortBy]: sortOrder
    };
  }

  try {
    const tasks = await Task.find(filter, projection, options);
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      res.sendStatus(404);
    } else {
      res.send(task);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const allowedUpdates = ['description', 'completed'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.sendStatus(404);
    }

    updates.map(update => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.sendStatus(404);
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
