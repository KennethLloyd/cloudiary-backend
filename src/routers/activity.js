const express = require('express');
const authenticate = require('../middleware/authenticate');
const { activityController } = require('../controllers');

const router = new express.Router();

router.post('/activities', authenticate, activityController.addActivity);
router.get('/activities', authenticate, activityController.getActivities);
router.put('/activities/:id', authenticate, activityController.editActivity);
router.delete(
  '/activities/:id',
  authenticate,
  activityController.deleteActivity,
);

module.exports = router;
