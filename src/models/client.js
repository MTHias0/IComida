const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    telNumber: {type: Number, required: true},
    address: {type: String, required: true},
    cards: [{
        type: {
            flag: String,
            number: Number
        }, 
        required: false
    }],
    orders: [{type: mongoose.Schema.Types.ObjectId, ref:'Order', required: false}]
});

module.exports = mongoose.model('Client', clientSchema);