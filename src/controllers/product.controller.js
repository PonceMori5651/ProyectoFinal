const {productsService} = require('../repositories/index')
const ProductDto = require('../dao/DTOs/ProductDto')

class ProductController{
    constructor(){
        this.dto = new ProductDto()
    }
    async getProducts(req,res){
        try {
            const query ={}
            const stock = req.query.stock
            const category = req.query.category
            const status = req.query.status
            let sortPrice = req.query.sort
            
            if(stock) query.stock = Number(stock)
            
            if(category) query.category = category
            
            if(status) query.status = status
            
            if(!sortPrice) sortPrice = "asc"
            const limit = Number(req.query.limit) || 10
            const page = Number(req.query.page) || 1
            
            const products = await productsService.getProducts(query,limit,page,sortPrice)
            if(!products){
                return res.sendServerError('No se pudo devolver los productos',404)
            }
            return res.sendSuccess(products)
        } catch (e) {
            return res.sendServerError(e.message,500)
        }
    }
    async getProductById(req,res){
        try {
            const productId = req.params.pid
            const product = await productsService.getProductById(productId)
            if(!product){
                return res.sendServerError('Product Not Found',404)
            }
            return res.sendSuccess(product)
        } catch (e) {
            return res.sendServerError(e.message,500)
        }
    }
    async createProduct(req,res){
        try {
            const newProduct = req.body
            const arrayFiles = req.files
            const productCreated = await productsService.createProduct(newProduct,arrayFiles)
            if(!productCreated){
                return res.sendServerError('Product No creado',404)
            }
            return res.sendSuccess(productCreated)
        } catch (e) {
            return res.sendServerError(e.message,500)
        }
    }
    async updateProduct(req,res){
        try {
            const productId = req.params.pid
            const productUpdated = req.body 
            const succesUpdated = await productsService.updateProduct(productId,productUpdated)
            if(!succesUpdated){
                return res.sendServerError('Product No actualizado',404)
            }
            return res.sendSuccess(succesUpdated)
        } catch (e) {
            return res.sendServerError(e.message,500)
        }
    }
    async deleteProduct(req,res){
        try {
            const productId = req.params.pid
            const succesDeleted = await productsService.deleteProduct(productId)
            if(!succesDeleted){
                return res.sendServerError('Product No eliminado',404)
            }
            return res.sendSuccess({})
        } catch (e) {
            console.log(e)
            return res.sendServerError(e.message,500)
        }
    }
}

module.exports = ProductController