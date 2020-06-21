const express = require('express');
const authenticate = require('../middleware/authenticate');
const { entryController } = require('../controllers');

const router = new express.Router();

router.post('/entries', authenticate, entryController.addEntry);
router.get('/entries', authenticate, entryController.getEntries);
router.patch('/entries/:id', authenticate, entryController.editEntry);
router.delete('/entries/:id', authenticate, entryController.deleteEntry);

module.exports = router;
