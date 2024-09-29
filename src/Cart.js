const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
    itemId: {type: String, required: true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    image: { type: String, required: true },
    Email: {type: String, required: true},
    CustomerName: { type: String, required: true}
})

const CartSchema = mongoose.model('cart', Cart);

module.exports = CartSchema;