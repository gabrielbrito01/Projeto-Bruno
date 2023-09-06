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

exports.createPromotion = async (req, res) => {
  try {
    const { name, description, productType, discountPercentage } = req.body;

    if (!name || !description || !productType || !discountPercentage) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios: name, description, productType, discount' });
    }

    const newPromotion = new Promotion({
      name,
      description,
      productType,
      discountPercentage,
    });

    await newPromotion.save();
    res.status(201).json({ message: 'Promoção criada com sucesso', promotion: newPromotion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar a promoção' });
  }
};

exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao recuperar as promoções' });
  }
};

exports.getPromotionById = async (req, res) => {
  const promotionId = req.params.promotionId;

  try {
    const promotion = await Promotion.findById(promotionId);

    if (!promotion) {
      return res.status(404).json({ error: 'Promoção não encontrada' });
    }

    res.json(promotion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao recuperar a promoção' });
  }
};

exports.updatePromotion = async (req, res) => {
  const promotionId = req.params.promotionId;

  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(promotionId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPromotion) {
      return res.status(404).json({ error: 'Promoção não encontrada' });
    }

    res.json({ message: 'Promoção atualizada com sucesso', promotion: updatedPromotion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar a promoção' });
  }
};

exports.deletePromotion = async (req, res) => {
  const promotionId = req.params.promotionId;

  try {
    const deletedPromotion = await Promotion.findByIdAndRemove(promotionId);

    if (!deletedPromotion) {
      return res.status(404).json({ error: 'Promoção não encontrada' });
    }

    res.json({ message: 'Promoção removida com sucesso', promotion: deletedPromotion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover a promoção' });
  }
};
