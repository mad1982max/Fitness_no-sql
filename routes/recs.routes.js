const express = require('express');
const router = express.Router();

const recController = require('../controllers/recs.controller.js');

router.get('/', recController.showAllRecs);
router.get('/:id', recController.getRecById);
router.post('/', recController.addRec);
router.patch('/:id', recController.updateRec);
router.delete('/:id', recController.deleteRec)

module.exports = router;