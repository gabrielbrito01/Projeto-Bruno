const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  productType: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
});

module.exports = mongoose.model('Promotion', promotionSchema);
