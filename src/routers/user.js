const express = require('express');
const { User } = require('../models');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();

    if (user) {
      return res.status(400).send({ error: 'Email already exists' });
    }

    const newUser = new User(req.body);

    await newUser.save();
    const token = await newUser.generateAuthToken();

    res.status(201).send({ user: newUser, token });
  } catch (e) {
    res.status(500).send({ error: 'Internal Server Error', details: e });
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    if (user === null) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(500).send({ error: 'Internal Server Error', details: e });
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    //remove the current token from the list of tokens to avoid logging out in other devices
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );

    await req.user.save();

    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
  const allowedUpdates = ['firstName', 'lastName', 'email', 'password'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    updates.map(update => (req.user[update] = req.body[update]));

    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
