const BaseRouter = require('./BaseRouter')
const ProductController = require('../controllers/product.controller')
const productController = new ProductController()
const uploader = require('../utils/upload')

class ProductRouter extends BaseRouter{

    init(){
        this.get('/',['PUBLIC'],productController.getProducts.bind(productController))
        this.get('/:pid',['PUBLIC'],productController.getProductById.bind(productController))
        this.post('/',['PUBLIC'],uploader.array('thumbnails',12),productController.createProduct.bind(productController))
        this.put('/:pid',['PUBLIC'],productController.updateProduct.bind(productController))
        this.delete('/:pid',['PUBLIC'],productController.deleteProduct.bind(productController))
    }
}

module.exports = ProductRouter

