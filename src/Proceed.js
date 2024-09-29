const mongoose = require('mongoose');

const Proceed = new mongoose.Schema({
    _id: {type: String, required: true},
    itemId: {type: String, required: true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    image: { type: String, required: true },
    Email: {type: String, required: true},
    CustomerName: { type: String, required: true}
}, {
    timestamps: false,
  })

const FinalProceed = new mongoose.Schema({
    email : { type: String, required: true},
    payment: { type: String, required: true},
    CardNumber: { type: String, required: true},
    SecurityCode:  { type: String, required: true},
    CouponCode:  { type: String},
    finalTotal : { type: Number, required: true },
    total : { type: Number, required: true },
    data: {type: [Proceed], required: true}


})


const OrderSchema = mongoose.model('order', FinalProceed);

module.exports = OrderSchema;