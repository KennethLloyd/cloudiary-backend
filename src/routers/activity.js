const express = require('express');
const authenticate = require('../middleware/authenticate');
const { activityController } = require('../controllers');

const router = new express.Router();

router.post('/activities', authenticate, activityController.addActivity);
router.get('/activities', authenticate, activityController.getActivities);

module.exports = router;
