
const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   description: { type: String, required: true },
   image: { type: String, required: true },
});

const Menu = mongoose.model('recipes', MenuItemSchema);

module.exports=Menu;