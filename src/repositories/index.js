const Cart = require('../dao/managerMongo/CartManagerMongo')
const Product = require('../dao/managerMongo/ProductManagerMongo')

const CartRepository = require('./Carts.repository')
const ProductRepository = require('./Products.repository')

const cartsService = new CartRepository(new Cart())
const productsService = new ProductRepository(new Product())

module.exports = {cartsService,productsService}