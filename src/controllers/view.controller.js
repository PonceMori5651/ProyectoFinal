const ViewDto = require('../dao/DTOs/ViewDto')

class ViewController{
    constructor(){
        this.dto = new ViewDto()
    }

async getProducts(req,res){
    try {
        
        const stock = req.query.stock 
        const category = req.query.category
        const status = req.query.status
        const sortPrice = req.query.sort || 'asc'
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const products = await this.dto.getProducts(stock,category,status,limit,page,sortPrice)
        req.user.admin = req.user.email == 'adminCoder@coder.com'
        delete req.user.password
        const productUser = Object.assign(products,req.user)
        res.render('products',productUser)
    } 
    catch (e) {
        const params = {
            error: e.message
        }
        return res.render('error',params)
      }
    }

async createProduct(req,res){
    try {
        const newProduct = req.body
        const arrayFiles = req.files
        const productCreated = await this.dto.createProduct(newProduct,arrayFiles)
        if(!productCreated){
            return res.render('error')
        }
        console.log({productCreated})
    } catch (e) {
        const params = {
            error: e.message
        }
        return res.render('error',params)
        }
    }
async getProductDetail(req,res){
        try {
            const idProduct = req.query.id
            const product = await this.dto.getProductDetail(idProduct)
            if(!product){
                return res.render('error')
            }
            return res.render('productDetail',product)
        } catch (e) {
            return res.render('error')
        }
    }
}
module.exports = ViewController