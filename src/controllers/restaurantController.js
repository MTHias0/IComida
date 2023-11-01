const restaurant = require('../models/restaurant');

const createRestaurant = async (req, res) => {
    const { name, email, address, telNumber, menu} = req.body;
    try{
        const response = await restaurant.create({
            name: name,
            email: email,
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
    const { restaurantId, itemName, price, role } = req.body;

  try {
    const updatedRestaurant = await restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $push: { menu: { name: itemName, price, role } } },
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

module.exports = { createRestaurant, editMenuItem, addMenuItem, deleteMenuItem, getItems };