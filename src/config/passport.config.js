const passport = require('passport')

const githubStrategy = require('../strategies/githubStrategy')
const registerLocalStrategy = require('../strategies/registerLocalStrategy')
const loginLocalStrategy = require('../strategies/loginLocalStrategy')
const jwtStrategy = require('../strategies/jwtStrategy')
const UserManagerMongo = require('../dao/managerMongo/UserManagerMongo')
const managerU = new UserManagerMongo()


const initializePassport = ()=>{
    passport.use('github',githubStrategy)
    passport.use('register',registerLocalStrategy)
    passport.use('login',loginLocalStrategy)
    passport.use('jwt',jwtStrategy)

    passport.serializeUser((user,done)=>{
        return done(null,user._id)
    })
    passport.deserializeUser(async (id,done)=>{
        const user = await managerU.getUserById(id)
        return done(null,user)
    })
}

module.exports = initializePassport