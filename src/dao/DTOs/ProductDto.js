const ProductManagerMongo = require('../managerMongo/ProductManagerMongo')

class ProductDto{
    constructor(){
        this.manager = new ProductManagerMongo()
    }
    async getProducts(query,limit,page,sortPrice){
        try {             
            const products = await this.manager.getProducts(query,limit,page,sortPrice)
            products.docs = products.docs.map(el=>el.toObject())
            const objResponse = {
                status: "succes",
                payload: products.docs,
                totalPages:products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink:(products.hasPrevPage)?`/api/products?page=${products.prevPage}`:null,
                nextLink:(products.hasNextPage)?`/api/products?page=${products.nextPage}`:null
            }
            return objResponse
        } catch (e) {
            return false
        }
    }
    async getProductById(productId){
        try {
            const product = await this.manager.getProductById(productId)
            if(!product) return false
            return product
        } catch (e) {
            return false
        }
    }
    async createProduct(newProduct,arrayFiles){
        try {
            if(newProduct.code.length === 0){
                return false
            }
            const arrayImages = []
            if(arrayFiles){
                for(let i=0; i<arrayFiles.length;i++){
                    arrayImages.push(arrayFiles[i].path)
                }
            }
            newProduct.thumbnails = arrayImages
    
            const productCreated = await this.manager.createProduct(newProduct)
            return productCreated
        } catch (e) {
            return false
        }
    }
    async updateProduct(productId,productUpdated){
        try {
            const succesUpdated = await this.manager.updateProduct(productId,productUpdated)
            if(!succesUpdated) return false
            return this.getProductById(productId)
        } catch (e) {
            return false
        }
    }
    async deleteProduct(productId){
        try {
            const succesDeleted = await this.manager.deleteProduct(productId)
            if(!succesDeleted) return false
            return succesDeleted
        } catch (e) {
            return false
        }
    }
}

module.exports = ProductDto