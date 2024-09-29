const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
});

const menuSchema = new mongoose.Schema({
    breakfast: [menuItemSchema],
    lunch: [menuItemSchema],
    dinner: [menuItemSchema],
    starters: [menuItemSchema],
    beverages: [menuItemSchema]
});

const Package = mongoose.model('packages', menuSchema);


module.exports = Package;

