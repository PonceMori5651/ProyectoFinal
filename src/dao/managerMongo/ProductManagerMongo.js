const productModel = require('../models/productModel');
class ProductManagerMongo{
    constructor(){
        this.model = productModel
    }
    async getProducts(query,limit,page,sortPrice) {
        const products = await this.model.paginate(query,{limit,page,sort: { price:sortPrice }})
        
        return products
    }
    createProduct(data){
        return this.model.create(data)
    }

    getProductById (id){
        return this.model.findById(id)
    }

    updateProduct (id, data){
        return this.model.findByIdAndUpdate(id,{$set:data})
    }
    deleteProduct (id){
        return this.model.findByIdAndDelete(id)
    }
}

module.exports = ProductManagerMongo