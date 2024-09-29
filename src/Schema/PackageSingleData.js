const mongoose = require('mongoose');

const MenuSingleItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

// Check if the model is already compiled before defining it again
const MenuItemSingle = mongoose.models.package || mongoose.model('packages', MenuSingleItemSchema);

module.exports = MenuItemSingle;
