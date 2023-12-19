const {cartsService} = require('../repositories/index')
const CartDto = require('../dao/DTOs/CartDto')
class CartController{
    constructor(){
        this.dto = new CartDto()
    }
    async getCarts(req,res){
        try {
            const carts = await cartsService.getCarts()
            return res.sendSuccess(carts)
        } catch (e) {
            return res.sendServerError(e.message,404)
        }
    }
    async getProductsInCart(req,res){
        try {
            const cartId = req.params.cid
            const arrayCarts = await cartsService.getProductsInCart(cartId)
            return res.sendSuccess(arrayCarts)
        } catch (e) {
            return res.sendServerError(e.message,404)
        }
    }
    async createProductInCart(req,res){
        try {
            const cartId = req.params.cid       
            const productId = req.params.pid
            const createProductInCart = await this.dto.createProductInCart(cartId,productId)
            return res.sendSuccess(createProductInCart)       
        } catch (error) {
            res.sendServerError(e.message,500)
        }
    }
    async createCart(req,res){
        try {
            const cartCreated = await this.dto.createCart()
            return res.sendSuccess(cartCreated)
        } catch (e) {
            return res.sendServerError(e.message,500)
        }
    }
    
    async updateCart(req,res){
            try {
                const body = req.body
                const cartId = req.params.cid 
                const updatedCart = await this.dto.updateCart(cartId,body)
                return res.sendSuccess(updatedCart)
            } catch (e) {
                return res.sendServerError(e.message,500)
            }
    }
    async updateProductInCart(req,res){
        try {
            const cartId = req.params.cid
            const productId = req.params.cid
            const quantity = req.body.quantity
            const updatedCart = await this.dto.updateProductInCart(cartId,productId,quantity)
            return res.sendSuccess(updatedCart)
        } catch (e) {
            return res.sendServerError(e.message,500)
        }
    }
    async deleteCart(req,res){
        try {
            const cartId = req.params.cid
            await this.dto.deleteCart(cartId)
            return res.sendSuccess({})
        } catch (e) {
            console.log(e)
            return res.sendServerError(e.message,404)
        }
    }
    async deleteProductInCart(req,res){
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            await this.dto.deleteProductInCart(cartId,productId)
            return res.sendSuccess({}) 
        } catch (e) {
            return res.sendServerError(e.message,500)
        }
    }
}

module.exports = CartController