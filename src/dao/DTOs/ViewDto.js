const CartManagerMongo = require('../managerMongo/CartManagerMongo')
const ProductManagerMongo = require('../managerMongo/ProductManagerMongo')

class ViewDto{
    constructor(){
        this.managerC = new CartManagerMongo()
        this.managerP = new ProductManagerMongo()
    }
    async getProducts(stock,category,status,limit,page,sortPrice){
        const query = {}
        if(stock) query.stock = Number(stock)
        if(category) query.category = category
        if(status) query.status = status
        const products = await this.managerP.getProducts(query,limit,page,sortPrice)
        products.docs = products.docs.map(el=>el.toObject())
        products.title = "Products"
        return products
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
    
            const productCreated = await this.managerP.createProduct(newProduct)
            return productCreated
        } catch (e) {
            return false
        }
    }
    async getProductDetail(idProduct){
        try {
            const product = await this.managerP.getProductById(idProduct)
            return product
        } catch (e) {
            return false
        }
    }
}
module.exports = ViewDto