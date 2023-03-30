const express = require('express');
const router = express.Router();
const taskController = require('./index.controller');

router.use(express.json());

// Assign a task to a user with a specific folder and file name
router.post('/', taskController.createTask);

module.exports = router;
