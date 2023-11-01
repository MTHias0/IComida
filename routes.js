const express = require('express');
const router = express();

const { createClient } = require('./src/controllers/clientController');
const { createOrder } = require('./src/controllers/orderController');
const { createRestaurant, editMenuItem, addMenuItem, deleteMenuItem, getItems } = require('./src/controllers/restaurantController');

//clientes
router.post("/create-client", createClient);

// pedidos
router.post("/create-order", createOrder);

//restaurantes
router.post("/create-restaurant", createRestaurant);
router.put("/edit-item", editMenuItem);
router.post("/add-item", addMenuItem);
router.delete("/remove-item", deleteMenuItem);
router.get("/menu", getItems)

module.exports = router;