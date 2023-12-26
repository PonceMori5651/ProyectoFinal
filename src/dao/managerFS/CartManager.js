const fs = require('fs')
const ProductManager = require('./ProductManager')
const managerP = new ProductManager('./json/products.json')

class CartManager{
    constructor(path){
        this.path = path
    }
    async getCarts() {
        try {
            const cartString = await fs.promises.readFile(this.path,'utf-8')
            const cartsArray = JSON.parse(cartString)
            return cartsArray
        } catch (e) {
           await fs.promises.writeFile(this.path,'[]')
           return [] 
        }
    }
    
    async createCart(){
        try {
            const carts = await this.getCarts()
            const newCart = {
                id: carts.length +1,
                products: []
            }
            carts.push(newCart)
            const cartsArray = JSON.stringify(carts,null,2)
            await fs.promises.writeFile(this.path,cartsArray)
            return newCart
        } catch (error) {
            console.log({error})
        }
    }
    async createProductxCart(cartId,productId){
        try {
            const carts = await this.getCarts()
            const cart = carts.find(el=>el.id===cartId)
            const product = await managerP.getProductById(productId)
            if(cart){
                if(product){
                    const existProductInCart = cart.products.find(el=>el.product===productId)
                    if(existProductInCart){
                        existProductInCart.quantity+=1
                    }else{
                        const objProductInCart = {
                            product: productId,
                            quantity: 1
                          }
                          cart.products.push(objProductInCart)
                    }
                    const cartsArray = JSON.stringify(carts,null,2)
                    await fs.promises.writeFile(this.path,cartsArray)
                    return cart
                }
                return false
            }
            return false
        } catch (error) {
            console.log({error})
        }
    }
    async getProductsInCart(idCart){
        const cart = await this.getCartById(idCart)
        if(cart){
            const arrayProducts = []
            for(let i=0;i<cart.products.length;i++){
                const idProduct = cart.products[i].product
                const product = await managerP.getProductById(idProduct)
                arrayProducts.push(product)
            }
            return arrayProducts          
        }
        return false
    }
    async getCartById (id){
        try {
            const carts = await this.getCarts()
            const findCart = carts.find(el=>el.id === id)
            if(!findCart){
                return false
            }
            return findCart
        } catch (error) {
            console.log({error})
        }
    }

    async deleteCart (id){
        try {
            const carts = await this.getCarts()
            const IndexCart = carts.findIndex(el=>el.id === id)
            if(IndexCart===-1){
                return false
            }
            carts.splice(IndexCart,1)
            for(let i=0;i<carts.length;i++){
                carts[i].id = i+1;
            }
            const cartsArray = JSON.stringify(carts,null,2)
            await fs.promises.writeFile(this.path,cartsArray)
            return true
        } catch (error) {
            console.log({error})
        }
    }
}

module.exports = CartManager