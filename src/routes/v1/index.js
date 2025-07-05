const express = require('express');
const router = express.Router(); // ✅ the good stuff

const userRouter = require('./user.routes');
const inventoryRouter = require('./inventory.routes');
console.log('TYPE of inventoryRouter:', typeof inventoryRouter);
const transportationRouter = require('./transportation.routes');
const wageRouter = require('./wage.router');
const alertRouter = require('./alert.router');
const productRouter = require('./product.routes');
const storageRouter = require('./storage.router');
const orderRouter = require('./order.routes.js');

const v1Router = express.Router();

v1Router.use('/users', userRouter);
v1Router.use('/products', productRouter);
console.log('inventoryRouter is', typeof inventoryRouter);
v1Router.use('/inventory', inventoryRouter);
v1Router.use('/transports', transportationRouter);
v1Router.use('/wages', wageRouter);
v1Router.use('/alerts', alertRouter);
v1Router.use('/storages', storageRouter);
v1Router.use('/buy', orderRouter);

module.exports = v1Router; // ✅ Only this export should remain