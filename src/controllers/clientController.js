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

module.exports = { createClient };