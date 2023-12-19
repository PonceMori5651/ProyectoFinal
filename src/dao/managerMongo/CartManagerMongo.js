const cartModel = require('../models/cartModel')
class CartManagerMongo{
    constructor(){
        this.model = cartModel
    }
     getCarts() {
        return this.model.find()
    }
    /*async getProductsInCart(id){
        const carts = await this.getCarts()
        const findCart = carts.find(el=>el._id.toString()===id)
        findCart.toObject()
        const array = []
        let qty,obj
        for(let i=0;i<findCart.products.length; i++){
            //findCart.products[i].toObject()
            //findCart.products[i].product.toObject()
            obj = findCart.products[i].product.toObject()
            qty = findCart.products[i].quantity
            obj.quantity = qty
            array.push(obj)
        }
        return array
       //return this.model.findOne({_id:id})
    }*/
    createCart(newCart){
        return this.model.create(newCart)
    }

    async createProductInCart(cart){
        cart.markModified('products')
        cart.save()
        return cart
    }

    getCartById (id){
        return this.model.findById(id)
            .then(cart=>{
                if(!cart){
                    throw new Error('Carrito No encontrado')
                }
                return cart
            })
    }

    async updateCart (cart){
        cart.markModified('products')
        cart.save()
        return cart
    }

    async updateProductInCart(cart){
        cart.save()
        return cart
    }

    async deleteCart (cart){
        cart.save()
        return true
    }
    async deleteProductInCart (idCart,cart){
        
        await this.model.findByIdAndUpdate(idCart,{$set:cart}) 

        return true
    }
}

module.exports = CartManagerMongo