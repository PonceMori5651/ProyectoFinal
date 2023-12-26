const BaseRouter = require('./BaseRouter')

const CartController = require('../controllers/cart.controller')
const cartController = new CartController()
class CartRouter extends BaseRouter{
    init(){
        this.get('/',['PUBLIC'],cartController.getCarts.bind(cartController))
        this.get('/:cid',['PUBLIC'],cartController.getProductsInCart.bind(cartController))
        this.post('/',['PUBLIC'],cartController.createCart.bind(cartController))
        this.post('/:cid/product/:pid',['PUBLIC'],cartController.createProductInCart.bind(cartController))
        this.delete('/:cid',['PUBLIC'],cartController.deleteCart.bind(cartController))
        this.delete('/:cid/products/:pid',['PUBLIC'],cartController.deleteProductInCart.bind(cartController))
        this.put('/:cid',['PUBLIC'], cartController.updateCart.bind(cartController))
        this.put('/:cid/products/:pid',['PUBLIC'], )
        this.post('/purchase',['PUBLIC'], cartController.purchaseCart.bind(cartController));
    }
}
module.exports = CartRouter