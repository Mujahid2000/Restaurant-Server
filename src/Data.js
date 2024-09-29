const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   description: { type: String, required: true },
   image: { type: String, required: true },
});

const PackageSchema = mongoose.model('datas', MenuItemSchema);

module.exports = PackageSchema;