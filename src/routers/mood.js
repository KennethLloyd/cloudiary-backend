const express = require('express');
const authenticate = require('../middleware/authenticate');
const { moodController } = require('../controllers');

const router = new express.Router();

router.post('/moods', authenticate, moodController.addMood);
router.get('/moods', authenticate, moodController.getMoods);

module.exports = router;
