const express = require('express');
const router = express.Router();

const planController = require('../controllers/plan.controller.js');

router.get('/', planController.showAllPlans);
router.get('/:id', planController.getPlanById);
router.post('/', planController.addPlan);
// router.patch('/:id', planController.updatePlan);
// router.delete('/:id', planController.deletePlan);

module.exports = router;