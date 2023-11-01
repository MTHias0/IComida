const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    telNumber: {type: Number, required: true},
    menu: [{
        type: {
            name: String,
            price: Number
        }, 
        required: false
    }],
    orders: [{type: mongoose.Schema.Types.ObjectId, ref:'Order', required: false}]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);