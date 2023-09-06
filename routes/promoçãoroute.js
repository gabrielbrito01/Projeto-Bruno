const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

router.get('/get-promotions-by-user/:userId', promotionController.getPromotionsByUser);
router.post('/', promotionController.createPromotion);
router.get('/', promotionController.getAllPromotions);
router.get('/:promotionId', promotionController.getPromotionById);
router.put('/:promotionId', promotionController.updatePromotion);
router.delete('/:promotionId', promotionController.deletePromotion);

module.exports = router;
