const jwt = require('jsonwebtoken')

const privateKey = 'KeyWebToken'

const generateToken = (payload)=>{
    const token = jwt.sign({user:payload},privateKey,{expiresIn:'24h'})
    return token
}

const verifyToken = (token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,privateKey,(err,payload)=>{
            if(err){
                return reject(err)
            }
            return resolve(payload)
        })
    })
}
module.exports = {
    generateToken,
    verifyToken
}