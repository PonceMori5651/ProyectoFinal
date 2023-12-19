const local = require('passport-local')
const LocalStrategy = local.Strategy
const UserManagerMongo = require('../dao/managerMongo/UserManagerMongo')
const managerU = new UserManagerMongo()

const registerLocalStrategy = new LocalStrategy(
    {passReqToCallback:true,usernameField:'email'},
    async (req,username,password,done)=>{
        try {
            const userCreated = await managerU.createUser(req.body)
            let objError = {}
            if(!userCreated){
                objError.message = 'Email ya registrado'
            }
            done(null,userCreated,objError)
        } catch (e) {
            done(e)
        }
    }
)
module.exports = registerLocalStrategy