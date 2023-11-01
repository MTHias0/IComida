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

module.exports = { createOrder };