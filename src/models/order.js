const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref:'Client', required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref:'Restaurant', required: true },
    quantity: { type: Number, required: true },
    inProgress: { type: Boolean, default: true },
});

module.exports = mongoose.model('Order', orderSchema);