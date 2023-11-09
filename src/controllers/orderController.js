const { query } = require('express');
const order = require('../models/order');

const createOrder = async (req, res) => {
    const { clientId, restaurantId, quantity } = req.body;
    try{
        const response = await order.create({
            clientId: clientId,
            restaurantId: restaurantId,
            quantity: quantity
        });
        return res.status(200).json(response);
        
    } catch (err) {
        console.error(err);
        return res
        .status(500)
        .json({ message: "Não foi possível efetuar a criação da conta..." });

    }

}

const listOrders = async (req, res) => {
    const { clientId, restaurantId } = req.query;

    try {
        let query = clientId ? { clientId } : restaurantId ? { restaurantId } : {};
        
        const orders = await order.find(query);

        return res.status(200).json(orders);
    } catch (err) {

        return res.status(500).json({ err: message.error });
    }
}

module.exports = { createOrder, listOrders };