const {cartsService} = require('../repositories/index')
const TicketDto = require('../dao/DTOs/TicketDto')
const CartManagerMongo = require('../dao/managerMongo/CartManagerMongo')
class CartController{
    constructor(){
        this.dtoT = new TicketDto()
        this.managerC = new CartManagerMongo()
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
            const cartId = req.user.cart.toString()     
            const productId = req.params.pid
            const createProductInCart = await cartsService.createProductInCart(cartId,productId)
            return res.sendSuccess(createProductInCart)       
        } catch (e) {
            res.sendServerError(e.message,500)
        }
    }
    async createCart(req,res){
        try {
            const cartCreated = await cartsService.createCart()
            return res.sendSuccess(cartCreated)
        } catch (e) {
            return res.sendServerError(e.message,500)
        }
    }
    
    async updateCart(req,res){
            try {
                const body = req.body
                const cartId = req.params.cid 
                const updatedCart = await cartsService.updateCart(cartId,body)
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
            const updatedCart = await cartsService.updateProductInCart(cartId,productId,quantity)
            return res.sendSuccess(updatedCart)
        } catch (e) {
            return res.sendServerError(e.message,500)
        }
    }
    async deleteCart(req,res){
        try {
            const cartId = req.params.cid
            await cartsService.deleteCart(cartId)
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
            await cartsService.deleteProductInCart(cartId,productId)
            return res.sendSuccess({}) 
        } catch (e) {
            return res.sendServerError(e.message,500)
        }
    }

    async purchaseCart(req, res) {
        const cid = req.user.cart.toString()
        const uid = req.user._id.toString()
        try {
            await this.dtoT.purchase(cid,uid)
            // Renderiza la vista de compra exitosa
            return res.render('purchase', { successMessage: 'Compra exitosa' });
        } catch (error) {
            // Renderiza la vista de error en caso de fallo
            return res.render('purchase', { errorMessage: 'Error al realizar la compra' });
        }
    }
}

module.exports = CartController