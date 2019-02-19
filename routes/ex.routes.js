const express = require('express');
const router = express.Router();

const exController = require('../controllers/ex.controller.js');

router.get('/', exController.showAllEx);
router.get('/:id', exController.getExById);
router.post('/', exController.addEx);
router.patch('/:id', exController.updateEx);
router.delete('/:id', exController.deleteEx);

module.exports = router;