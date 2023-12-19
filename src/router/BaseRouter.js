const {Router} = require('express')
const {verifyToken} = require('../utils/jwt')

class BaseRouter{
    constructor(){
        this.router = new Router()
        this.init()
    }
    getRouter(){
        return this.router
    }

    init(){}

    get(path,policies,...callbacks){
        this.router.get(path,this.generateCustomResponses(),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }
    post(path,policies,...callbacks){
        this.router.post(path,this.generateCustomResponses(),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }
    put(path,policies,...callbacks){
        this.router.put(path,this.generateCustomResponses(),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }
    delete(path,policies,...callbacks){
        this.router.delete(path,this.generateCustomResponses(),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }
    applyCallbacks(callbacks){
        return callbacks.map(callback=>(...params)=>{
            callback.apply(this,params)
        })
    }
    generateCustomResponses(){
        return (req,res,next)=>{
            res.sendSuccess = payload => res.json({status:"success",payload})
            res.sendServerError = (error,status) => res.status(status).json({status:"error",error})
            res.sendUserError = (error,status) => res.status(status).json({status:"error",error})
            return next()
        }
    }

 handlePolicies (policies) {
        return (req, res, next) => {
          if (policies.includes('PUBLIC')) {
            return next()
          }
    
          const token = req.cookies['authCookieToken']
          console.log({ policies ,token})
          const user = verifyToken(token)
          if (policies.includes(user.role.toUpperCase())) {
            return next()
          }
    
          return res.sendUserError('NO TIENES PERMISOS', 403)
        }
    }

}

module.exports = BaseRouter