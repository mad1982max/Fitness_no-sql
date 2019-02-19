const express = require('express');
const router = express.Router();
const cache = require('../middleware/cache.mw');

const coachesController = require('../controllers/coaches.controller.js');

router.get('/', coachesController.showAllCoaches);
router.get('/:id', coachesController.getCoachById);
router.post('/', coachesController.addCoach);
router.patch('/:id', coachesController.updateCoach);
router.delete('/:id', coachesController.deleteCoach);

module.exports = router;