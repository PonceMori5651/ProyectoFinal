const passportJwt = require('passport-jwt')

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const cookieExtractor = req=>{
    let token = null
    if(req && req.cookies){
        token= req.cookies['authCookieToken']
    }
    return token
}

const jwtStrategy = new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: 'KeyWebToken'
}, async (jwt_payload,done)=>{
    try {
        return done(null,jwt_payload.user)
    } catch (e) {
        return done(e)
    }
})
module.exports = jwtStrategy