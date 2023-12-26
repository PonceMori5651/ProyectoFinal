const CartManagerMongo = require('../managerMongo/CartManagerMongo')
const ProductManagerMongo = require('../managerMongo/ProductManagerMongo')
const TicketManagerMongo = require('../managerMongo/TicketManagerMongo')
const { v4: uuidv4 } = require('uuid'); 

class TicketDto{
    constructor(){
        this.managerC = new CartManagerMongo()
        this.managerP = new ProductManagerMongo()
        this.managerT = new TicketManagerMongo()
    }

async purchase(cartId,userId) {
    const cart = await this.managerC.getCartById(cartId);

    const purchasedProducts = [];
    const failedProducts = [];
    for (const item of cart.products) {
      try {
        const product = await this.managerP.getProductById(item.product._id);
        const quantityInCart = item.quantity;
  
        if (product.stock >= quantityInCart) {
          // Resta el stock del producto
          product.stock -= quantityInCart;
          purchasedProducts.push({
            productId: product._id,
            quantity: quantityInCart,
            price: product.price
          });
          await this.managerP.updateProduct(product._id.toString(),product);
        } else {
          // Agrega el producto a la lista de fallos
          failedProducts.push(product._id);
        }
      } catch (error) {
        // Manejo de errores al obtener información del producto
        console.error(`Error al obtener información del producto: ${error.message}`);
        failedProducts.push(item.product._id);
      }
    }
    // Crea el ticket
    const ticket = await this.managerT.createTicket({
      code: this.generateUniqueCode(),
      amount: this.calculateTotalAmount(purchasedProducts),
      purchaser: userId,
      products: purchasedProducts,
    });
    
    // Actualiza el carrito con los productos que no se pudieron comprar
    cart.products = cart.products.filter(item => failedProducts.includes(item.product.toString()));
    await this.managerC.updateCart(cart);
  
    return { ticket };
  }
  
  generateUniqueCode() {
    return uuidv4();
  }
  
  calculateTotalAmount(products) {
    return products.reduce((total, product) => {
      return total + (product.quantity * product.price); 
    }, 0);
  }
}
  
  module.exports = TicketDto
