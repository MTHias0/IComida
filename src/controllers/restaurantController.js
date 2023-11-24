const restaurant = require('../models/restaurant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createRestaurant = async (req, res) => {
    const { name, email, password, address, telNumber, menu} = req.body;

    try{
        const response = await restaurant.create({
            name: name,
            email: email,
            password: password,
            address: address,
            telNumber: telNumber,
            menu: menu
        });

        return res.status(200).json(response);
    } catch (err) {
        console.error(err);

        return res
        .status(500)
        .json({ message: "Não foi possível efetuar a criação da conta..." });
    }
}

const loginAsRestaurant = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loggedRestaurant = await restaurant.findOne({ email });

   const isPasswordValid = password === loggedRestaurant.password;

    if(!isPasswordValid) {

      return res.status(401).json({ message: 'Email ou senha inválidos'});
    }

    const token = jwt.sign({ restaurantId: loggedRestaurant._id }, 'your-secret-key', { expiresIn: '1h'});
    
    return res.json({ token });

  } catch (err) {
    
    return res.status(500).json({ error: err.message });
  }
}

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurant.find();

    return res.status(200).json(restaurants);
  } catch (err) {

    return res.status(404).json({ message: "Nenhum restaurante encontrado" });
  }
}

const getRestaurantByid = async (req, res) => {
  try {
    const restaurant = await restaurant.findById({ _id: req.params.id });

    return res.status(200).json(restaurant);
  } catch (err) {
    
    return res.status(404).json({ message: "Restaurante não encontrado "});
  }
}

const updateRestaurant = async (req, res) => {
  const { restaurantId, newName, newEmail, newAddress, newTelNumber } = req.body;

  try {
    const updatedRestaurant = await restaurant.findOneAndUpdate(
      { _id: restaurantId },
      {
        $set: {
          name: newName,
          email: newEmail,
          address: newAddress,
          telNumber: newTelNumber
        },
      },
      { new: true }
    );

    return res.status(200).json(updatedRestaurant);
  } catch (err) {
    
    return res.status(500).json({ error: err.message });
  }
}

const deleteRestaurant = async (req, res) => {
  const { restaurantId } = req.body;

  try {
    const deleteRestaurant = await restaurant.findOneAndDelete({ _id: restaurantId });

    return res.json({ mesage: `restaurante ${deleteRestaurant.name} deletado` });
  } catch (err) {

    return res.status(500).json({ error: err.message });
  }
}

const editMenuItem = async (req, res) => {
    const { restaurantId, itemName, newPrice, newName } = req.body;

    try {
        const updatedItems = await restaurant.findOneAndUpdate(
            { _id: restaurantId, "menu.name": itemName},
            { $set: { "menu.$.name": newName, "menu.$.price": newPrice } },
            { new: true }
        );

        return res.status(200).json(updatedItems.menu);
    } catch (err) {

        return res.status(500).json({ error: err.message })
    }
}

const addMenuItem = async (req, res) => {
    const { restaurantId, itemName, price, category } = req.body;

  try {
    const updatedRestaurant = await restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $push: { menu: { name: itemName, price, category } } },
      { new: true }
    );

    res.json(updatedRestaurant);
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }

}

const deleteMenuItem = async (req, res) => {
    const { restaurantId, itemName } = req.body;

  try {
    const updatedRestaurant = await restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $pull: { menu: { name: itemName } } },
      { new: true }
    );

    return res.json(updatedRestaurant);
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
}

const getItems = async (req, res) => {
    try{
        const restaurantMenu = await restaurant.findOne({ _id: req.query.restaurantId });
        if(!restaurantMenu) {

            return res.status(404).json({ message: 'Restaurant not found' });
        }

        return res.json(restaurantMenu.menu);
    } catch (err) {

        return res.status(500).json({ error: err.message });
    }
}

module.exports = { createRestaurant, editMenuItem, addMenuItem, deleteMenuItem, getItems, getAllRestaurants, getRestaurantByid, updateRestaurant, deleteRestaurant, loginAsRestaurant };