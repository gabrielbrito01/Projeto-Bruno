const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

router.get('/get-promotions-by-user/:userId', promotionController.getPromotionsByUser);

module.exports = router;
