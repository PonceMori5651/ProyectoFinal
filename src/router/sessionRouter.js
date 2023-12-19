const BaseRouter = require('./BaseRouter')

const passport = require('passport')
const {generateToken} = require('../utils/jwt')
const UserManagerMongo = require('../dao/managerMongo/UserManagerMongo')
const managerU = new UserManagerMongo()

const initSession = (user)=>{
  const token = generateToken({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    age: user.age,
    role: user.role
  }) 
  return token
}
class SessionRouter extends BaseRouter{
    init(){
        this.get('/github',['PUBLIC'],passport.authenticate('github',{scope:['user:email']}) ,async (req, res) => {

        })
        this.get('/github-callback',['PUBLIC'],passport.authenticate('github',{failureRedirect:'/login'}) ,async (req,res)=>{
          const token = initSession(req.user)
          return res.cookie('authCookieToken',token,{httpOnly:true}).redirect('/products')
        })
        this.post('/register',['PUBLIC'],passport.authenticate('register',{failureRedirect:'/register',failureFlash:true}) ,async (req, res) => {
          const token = initSession(req.user)
          return res.cookie('authCookieToken',token,{httpOnly:true}).redirect('/products')
          })
        this.post('/login',['PUBLIC'],passport.authenticate('login',{failureRedirect:'/login',failureFlash:true}) ,async (req,res)=>{
          const token = initSession(req.user)
          return res.cookie('authCookieToken',token,{httpOnly:true}).redirect('/products')
        })
        this.post('/recoveryPassword',['PUBLIC'],async(req,res)=>{
          try {
            await managerU.updatePassword(req.body)
            return res.redirect('/login')
        } catch (e) {
            return res.status(401).json({
                error: e.message
              })
        }
        })

    }
}
module.exports = SessionRouter