const fs = require('fs')
class ProductManager{
    constructor(path){
        this.path = path
    }
    async getProducts() {
        try {
            const productString = await fs.promises.readFile(this.path,'utf-8')
            const productsArray = JSON.parse(productString)
            return productsArray
        } catch (e) {
           await fs.promises.writeFile(this.path,'[]')
           return [] 
        }
    }
    async createProduct(data){
        try {
            const products = await this.getProducts()
            if(data.title==''|| !data.title ||
            data.description==''|| !data.description ||
            data.price==''|| !data.price ||
            data.code==''|| !data.code ||
            data.stock==''|| !data.stock ||
            data.category=='' || !data.category){
                return false
            }
            const newProduct = {
                id: products.length +1,
                title: data.title,
                description: data.description,
                price: data.price,
                thumbnails: data.thumbnails,
                code: data.code,
                stock: data.stock,
                category: data.category,
                status: true
            }
            products.push(newProduct)
            const productsArray = JSON.stringify(products,null,2)
            await fs.promises.writeFile(this.path,productsArray)
            return newProduct
        } catch (error) {
            console.log({error})
        }
    }

    async getProductById (id){
        try {
            const products = await this.getProducts()
            const findProduct = products.find(el=>el.id === id)
            if(!findProduct){
                return false
            }
            return findProduct
        } catch (error) {
            console.log({error})
        }
    }

    async updateProduct (id, data){
        try {
        const products = await this.getProducts()
        const IndexProduct = products.findIndex(el=>el.id === id)
        if(IndexProduct===-1){
            return false
        }
        products[IndexProduct].title = data.title || products[IndexProduct].title
        products[IndexProduct].description = data.description || products[IndexProduct].description
        products[IndexProduct].price = data.price || products[IndexProduct].price
        products[IndexProduct].code = data.code || products[IndexProduct].code
        products[IndexProduct].stock = data.stock || products[IndexProduct].stock
        const productsArray = JSON.stringify(products,null,2)
        await fs.promises.writeFile(this.path,productsArray)
        return products[IndexProduct]
        } catch (error) {
            console.log({error})
        }
    }
    async deleteProduct (id){
        try {
            const products = await this.getProducts()
            const IndexProduct = products.findIndex(el=>el.id === id)
            if(IndexProduct===-1){
                return false
            }
            
            products.splice(IndexProduct,1)

            for(let i=0;i<products.length;i++){
                products[i].id = i+1;
            }
            const productsArray = JSON.stringify(products,null,2)
            await fs.promises.writeFile(this.path,productsArray)

            return products
        } catch (error) {
            console.log({error})
        }
    }
}

/*const manager = new ProductManager('../json/products.json')
const product1 =   {
    price: 10.98
  }
const init = async()=>{
    await manager.deleteProduct(4)
    await manager.createProduct(product1)
    const products = await manager.getProducts()
    console.log(products)
}

init()*/
module.exports = ProductManager