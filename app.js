const express = require('express');
const routes = require('./routes');
require('./config/database');

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3000, ()=> {
console.log('Servidor foi iniciado na porta 3000');
})

// async function createClient() {
//     await client.create({
//         name: 'Matheus Gomes Maciel',
//         email: 'matheusgmaciel@gmail.com',
//         address: 'Rua Joselita Reis Brasileiro, catolé, 609',
//         telNumber: 83996922100
//     })
// };

// async function createRestaurant() {
//     await restaurant.create({
//         name: 'Massas da Massa',
//         email: 'massasdamassa@gmail.com',
//         address: 'Rua das Massas Corridas, longe, 000',
//         telNumber: 8399999999,
//         menu: [
//             {name: 'Pizza da massa', price: 35, role: 'dinner'},
//             {name: 'Spaghetti', price: 20, role: 'dinner'},
//             {name: 'Coca-Cola 2L', price: 10, role: 'drink'},
//             {name: 'Ice-cream', price: 5, role: 'dessert'},
//             {name: 'lasgna', price: 40, role: 'dinner'}
//         ],
//     })
// };

// async function createOrder() {
//     await order.create({
//         clientId: '654294a5a74bbf25754d2c98',
//         restaurantId: '654296b104b4dd1c006584fd',
//         quantity: 2
//     })
// };