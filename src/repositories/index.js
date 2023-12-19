const Cart = require('../dao/managerMongo/CartManagerMongo')
const Product = require('../dao/managerMongo/ProductManagerMongo')
const Message = require('../dao/managerMongo/MessageManagerMongo')
const User = require('../dao/managerMongo/UserManagerMongo')

const CartRepository = require('./Carts.repository')

const cartsService = new CartRepository(new Cart())
module.exports = {cartsService}