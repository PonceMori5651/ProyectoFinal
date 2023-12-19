const fs = require('fs')
class UserManager{
    constructor(path){
        this.path = path
    }
    async getUsers(){
        try {
            const userString = await fs.promises.readFile(this.path,'utf-8')
            const usersArray = JSON.parse(userString)
            return usersArray
        } catch (e) {
           await fs.promises.writeFile(this.path,'[]')
           return [] 
        }
    }
    async createUser(data){
        try {
            const users = await this.getUsers()
            const newUser = {
                id: users.length +1,
                name: data.name
            }
            users.push(newUser)
            const usersArray = JSON.stringify(users,null,2)
            await fs.promises.writeFile(this.path,usersArray)
            return newUser
        } catch (error) {
            console.log({error})
        }
    }
}

module.exports = UserManager