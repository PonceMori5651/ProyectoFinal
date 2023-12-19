const BaseRouter = require('./BaseRouter')

const uploader = require('../utils/upload')
const passport = require('passport')
const ViewController = require('../controllers/view.controller')
const viewController = new ViewController()

const ProductManagerMongo = require('../dao/managerMongo/ProductManagerMongo')
const manager = new ProductManagerMongo(/*'./json/products.json'*/)
const CartManagerMongo = require('../dao/managerMongo/CartManagerMongo')
const managerC = new CartManagerMongo(/*'./json/products.json'*/)

class ViewsRouter extends BaseRouter{
    init(){
        this.get('/home',['PUBLIC'],async(req,res)=>{
            const products = await manager.getProducts(null,42)
            products.title = "Bienvenidos"
            products.name = "Aaron"
            res.render('home',products)
        })
        this.get('/realtimeproducts',['PUBLIC'],async(req,res)=>{
            try {
                const products = await manager.getProducts(null,42)
                products.title = "Bienvenidos"
                products.name = "Aaron"
                res.render('realtimeproducts',products)
            } catch (e) {
                const params = {
                    error: e.message
                }
                return res.render('error',params)
            }
        })
        this.post('/realtimeproducts',['PUBLIC'],async(req,res)=>{
            try {
                const product = req.body
                await manager.createProduct(product) 
            } catch (e) {
                return res.render('error')
            }
        })
        this.delete('/:id',['PUBLIC'],async(req,res)=>{
            try {
                const productId = req.params.id
                await manager.deleteProduct(productId)
            } catch (e) {
                return res.render('error')
            }
        })
        //PRODUCTOS CON PAGINACION
        this.get('/products',['PUBLIC'],(req, res, next) => {
            if (!req.user) {
              return res.redirect('/login')
            }
          
            return next()
          },passport.authenticate('jwt',{session:false}),viewController.getProducts.bind(viewController))
        this.post('/products',['PUBLIC'],uploader.array('thumbnails',12),viewController.createProduct.bind(viewController))
        this.get('/productDetail',['PUBLIC'],viewController.getProductDetail.bind(viewController))
        this.get('/carts/:cid',['PUBLIC'],async(req,res)=>{
            try {
                let cartId = req.params.cid
                if(cartId==='carritoCompras'){
                    cartId = req.session.cartId
                }
                //console.log(typeof cartId)
                const cart = await managerC.getProductsInCart(cartId)
                const params = {
                    cart
                }
                return res.render('cart',params)
            } catch (e) {
                return res.status(400).json({message:e.message})
            }
        })
        //ENDPOINTS SESSION LOGIN
        this.get('/login',['PUBLIC'],this.sessionMiddleware(),(req,res)=>{
            return res.render('login',{error:req.flash('error')[0]})
        })
        this.get('/recoveryPassword',['PUBLIC'],this.sessionMiddleware(),(req,res)=>{
            return res.render('recoveryPassword')
        })
        this.get('/register',['PUBLIC'],this.sessionMiddleware(),(req,res)=>{
            return res.render('register',{error:req.flash('error')[0]})
        })
        this.get('/profile',['PUBLIC'],(req, res, next) => {
            if (!req.user) {
              return res.redirect('/login')
            }
          
            return next()
          }, (req, res) => {
            const user = req.session.user
            return res.render('profile', { user })
        })
        this.get('/logout',['PUBLIC'], (req, res) => {
            return res.clearCookie('connect.sid').redirect('/login')
        })
        
        //ENDPOINTS CHAT
        this.get('/chat',['PUBLIC'],(req,res)=>{
            return res.render('chat')
        })
    }
    sessionMiddleware (){
        return (req, res, next) => {
        if (req.user) {
          return res.redirect('/products')
        }
      
        return next()
      }}
}
module.exports = ViewsRouter