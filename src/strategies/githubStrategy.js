
const GitHubStrategy = require('passport-github2')
const UserManagerMongo = require('../dao/managerMongo/UserManagerMongo')
const managerU = new UserManagerMongo()

const githubStrategy = new GitHubStrategy({
    clientID: 'Iv1.6b4f8126426243ed',
    clientSecret: 'cac510c9bdd2ad60f1de72245bb58ffecc7992d5',
    callbackURL: 'http://localhost:8080/api/session/github-callback'
},
async(accessToken,refreshToken,profile,done)=>{
    try {
        
        const user = await managerU.getLoginTercero({
            name:profile.username,
            email:profile._json.login
        })
        //console.log({user})
        return done(null,user)
    } catch (e) {
        return done(e)
    }
}
)
module.exports = githubStrategy