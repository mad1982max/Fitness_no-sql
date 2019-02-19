const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients.controller.js');
const redis = require('../middleware/cache.mw');

router.get('/', redis.cache, clientsController.showAllClients);
router.get('/:id', clientsController.getClientById);
router.post('/', clientsController.addClient);
router.put('/:id', clientsController.updateClient);
router.delete('/:id', clientsController.deleteClient)

module.exports = router;