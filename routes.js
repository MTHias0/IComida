const express = require('express');
const router = express();

const { createClient, deleteClient, updateClient } = require('./src/controllers/clientController');
const { createOrder, listOrders } = require('./src/controllers/orderController');
const { createRestaurant, loginAsRestaurant, editMenuItem, addMenuItem, deleteMenuItem, getItems, getAllRestaurants, getRestaurantByid, updateRestaurant, deleteRestaurant } = require('./src/controllers/restaurantController');

//clientes
router.post("/create-client", createClient);
//
router.put("/update-client", updateClient);
router.delete("/delete-client", deleteClient);

// pedidos
router.post("/create-order", createOrder);
//
router.get("/get-orders", listOrders)

//restaurantes
router.post("/create-restaurant", createRestaurant);
router.put("/edit-item", editMenuItem);
router.post("/add-item", addMenuItem);
router.delete("/remove-item", deleteMenuItem);
router.get("/menu", getItems);
//
router.post("/restaurant-login", loginAsRestaurant);
router.get("/list-restaurants", getAllRestaurants);
router.get("/restaurant", getRestaurantByid);
router.put("/update-restaurant", updateRestaurant)
router.delete("/delete-restaurant", deleteRestaurant)

module.exports = router;