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
}

module.exports = CartRepository