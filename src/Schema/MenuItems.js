const mongoose = require('mongoose');

const NewMenuItems = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    Image: {type: String, require: true}
});


const MenuSchema = new mongoose.Schema({
    breakfast: {type: [NewMenuItems], require: true},
    lunch: {type: [NewMenuItems], require: true},
    dinner: {type: [NewMenuItems], require: true},
    starters: {type: [NewMenuItems], require: true},
    beverages: {type: [NewMenuItems], require: true},
})


const MenusItems = mongoose.model('package', MenuSchema);

module.exports = MenusItems;