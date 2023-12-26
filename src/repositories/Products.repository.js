const ProductDto = require('../dao/DTOs/ProductDto')

class ProductRepository{
    constructor(dao){
        this.dao=dao
        this.dto = new ProductDto()
    }
    async getProducts(query,limit,page,sortPrice){
        try {             
            const products = await this.dto.getProducts(query,limit,page,sortPrice)
            return products
        } catch (e) {
            return false
        }
    }
    async getProductById(productId){
        try {
            const product = await this.dto.getProductById(productId)
            return product
        } catch (e) {
            return false
        }
    }
    async createProduct(newProduct,arrayFiles){
        try {   
            const productCreated = await this.dto.createProduct(newProduct,arrayFiles)
            return productCreated
        } catch (e) {
            return false
        }
    }
    async updateProduct(productId,productUpdated){
        try {
            const succesUpdated = await this.dto.updateProduct(productId,productUpdated)
            return succesUpdated
        } catch (e) {
            return false
        }
    }
    async deleteProduct(productId){
        try {
            const succesDeleted = await this.dto.deleteProduct(productId)
            return succesDeleted
        } catch (e) {
            return false
        }
    }
}

module.exports = ProductRepository