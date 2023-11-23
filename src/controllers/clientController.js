const client = require('../models/client');

const createClient = async (req, res) => {
    const { name, email, address, telNumber} = req.body;

    try{
        const response = await client.create({
            name: name,
            email: email,
            address: address,
            telNumber: telNumber
        });
        return res.status(200).json(response);
        
    } catch (err) {
        console.error(err);
        return res
        .status(500)
        .json({ message: "Não foi possível efetuar a criação da conta..." });

    }
}
const getAllClients = async (req, res) => {
  try {
    const clients = await client.find();

    return res.status(200).json(clients);
  } catch (err) {

    return res.status(404).json({ message: "Nenhum cliente encontrado" });
  }
}

const updateClient = async (req, res) => {
    const { clientId, newName, newEmail, newAddress, newTelNumber } = req.body;
  
    try {
      const updatedClient = await client.findOneAndUpdate(
        { _id: clientId },
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
  
      return res.status(200).json(updatedClient);
    } catch (err) {
      
      return res.status(500).json({ error: err.message });
    }
  }
  
  const deleteClient = async (req, res) => {
    const { clientId } = req.body;
  
    try {
      const deletedClient = await client.findOneAndDelete({ _id: clientId });
  
      return res.json({ mesage: `restaurante ${deletedClient.name} deletado` });
    } catch (err) {
  
      return res.status(500).json({ error: err.message });
    }
  }

module.exports = { createClient, deleteClient, updateClient,getAllClients };
