const express = require('express');
const router = express.Router();

const cardsController = require('../controllers/cards.controller.js');

router.get('/', cardsController.showAllCards);
router.get('/:id', cardsController.getCardById);
router.post('/', cardsController.addCard);
router.patch('/:id', cardsController.updateCard);
router.delete('/:id', cardsController.deleteCard)

module.exports = router;