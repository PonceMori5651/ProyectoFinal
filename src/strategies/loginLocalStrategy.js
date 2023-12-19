const local = require('passport-local')

const UserManagerMongo = require('../dao/managerMongo/UserManagerMongo')
const managerU = new UserManagerMongo()

const CartManagerMongo = require('../dao/managerMongo/CartManagerMongo')
const managerC = new CartManagerMongo()

const LocalStrategy = local.Strategy

const loginLocalStrategy = new LocalStrategy(
    {usernameField:'email'},
    async (email,password,done)=>{
        try {
            
            let user = await managerU.loginValidation({email,password})
            let objError = {}
            if(!user){
                objError.message = 'Usuario o contraseña invalidos'
            }
            
            return done(null,user,objError)
        } catch (e) {
            done(e)
        }
    }
)

module.exports = loginLocalStrategy