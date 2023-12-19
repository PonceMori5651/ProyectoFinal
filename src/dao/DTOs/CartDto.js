const CartManagerMongo = require('../managerMongo/CartManagerMongo')
const ProductManagerMongo = require('../managerMongo/ProductManagerMongo')

class CartDto{
    constructor(){
        this.manager = new CartManagerMongo()
        this.managerP = new ProductManagerMongo()
    }
    async getCarts(){
        try {             
            const carts = await this.manager.getCarts()
            return carts
        } catch (e) {
            return false
        }
    }

    /*async getCartById(cartId){
        try {
            const cart = await this.manager.getCartById(cartId)
            return cart
        } catch (e) {
            return false
        }
    }*/
    async createCart(){
        try {
            const newCart = { products: [] }
            const cartCreated = await this.manager.createCart(newCart)
            return cartCreated
        } catch (e) {
            return false
        }
    }

    async createProductInCart(cid,pid){
        try {
            if(cid==='null'){
                cid = req.session.cartId
            }
            const cart = await this.manager.getCartById(cid)
            const product = await this.managerP.getProductById(pid)
            const objProduct ={
                product:product._id,
                quantity:1
            }
            const existsProductInCart = cart.products.find(el=>el.product.toString()===pid)
            if(existsProductInCart){existsProductInCart.quantity+=1}
            else {cart.products.push(objProduct)}
            const createProductInCart = await this.manager.createProductInCart(cart)
            return createProductInCart  
        } catch (error) {
            return false
        }
    }
    async updateCart(cartId,cartUpdated){
        try {
            const cart = await this.manager.getCartById(cartId)
            for(let i=0;i<cartUpdated.length;i++){
                await this.managerP.getProductById(cartUpdated[i]._id.toString())
            }
            cart.products.splice(0)
            for(let i=0;i<cartUpdated.length;i++){
                const objProduct ={
                    product:cartUpdated[i]._id,
                    quantity:1
                }
                cart.products.push(objProduct)
            }
            const succesUpdated = await this.manager.updateCart(cart)
            return succesUpdated
        } catch (e) {
            return false
        }
    }
    async updateProductInCart(cartId,productId,quantity){
        try {
            const cart = await this.manager.getCartById(cartId)
            const existsProductInCart = cart.products.find(el=>el.product.toString()===productId)
            if(!existsProductInCart){
                false
            }
            existsProductInCart.quantity =quantity
            const succesUpdated = await this.manager.updateProductInCart(cart)
            return succesUpdated
        } catch (e) {
            return false
        }

    }
    async deleteCart(cartId){
        try {
            const cart = await this.manager.getCartById(cartId)
            cart.products.splice(0)
            const succesDeleted = await this.manager.deleteCart(cart)
            return succesDeleted
        } catch (e) {
            return false
        }
    }

    async deleteProductInCart(cartId,productId){
        try {
            const cart = await this.manager.getCartById(cartId)
            const findProduct = cart.products.findIndex(el=>el.product.toString()===productId)
            if(findProduct===-1){
                return false
            }
            cart.products.splice(findProduct,1)
            await this.manager.deleteProductInCart(cartId,cart)
            return true
        } catch (e) {
            return false
        }
    }
    //EXTRAS
    async getProductsInCart(cartId){
        try {
            const carts = await this.manager.getCarts()
            const findCart = carts.find(el=>el._id.toString()===cartId)
            return findCart.products
        } catch (e) {
            return false
        }
    }
}

module.exports = CartDto