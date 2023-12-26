const CartDto = require('../dao/DTOs/CartDto')

class CartRepository{
    constructor(dao){
        this.dao=dao
        this.dto = new CartDto()
    }
    async getCarts(){
        const carts = this.dao.getCarts()
        return carts
    }
    async getProductsInCart(cartId){
        try {
            const products = await this.dto.getProductsInCart(cartId)
            return products
        } catch (e) {
            return false
        }
    }
    async createProductInCart(cartId,productId){
        try {
            const createProductInCart = await this.dto.createProductInCart(cartId,productId)
            return createProductInCart   
        } catch (error) {
            res.sendServerError(e.message,500)
        }
    }
    async createCart(){
        try {
            const cartCreated = await this.dto.createCart()
            return cartCreated
        } catch (e) {
            return false
        }
    }
    async updateCart(cartId,body){
        try {
            const succesUpdated = await this.dto.updateCart(cartId,body)
            return succesUpdated
        } catch (e) {
            return false
        }
    }
    async updateProductInCart(cartId,productId,quantity){
        try {
            const succesUpdated = await this.dto.updateProductInCart(cartId,productId,quantity)
            return succesUpdated
        } catch (e) {
            return false
        }

    }

    async deleteCart(cartId){
        try {
            const succesDeleted = await this.dto.deleteCart(cartId)
            return succesDeleted
        } catch (e) {
            return false
        }
    }
    async deleteProductInCart(cartId,productId){
        try {
            await this.dto.deleteProductInCart(cartId,productId)
            return true
        } catch (e) {
            return false
        }
    }
}

module.exports = CartRepository