const Promotion = require('../models/promotionModel');
const User = require('../models/userModel');

exports.getPromotionsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const promotions = await Promotion.find({ productType: { $in: user.favoriteProductTypes } });

    res.json(promotions);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao recuperar promoções' });
  }
};
