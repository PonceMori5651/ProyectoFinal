const fs = require('fs')
class MessageManager{
    constructor(path){
        this.path = path
    }
    async getMessages(){
        try {
            const messageString = await fs.promises.readFile(this.path,'utf-8')
            const messagesArray = JSON.parse(messageString)
            return messagesArray
        } catch (e) {
           await fs.promises.writeFile(this.path,'[]')
           return [] 
        }
    }
    async createMessage(data){
        try {
            const messages = await this.getMessages()
            const newMessage = {
                id: messages.length +1,
                message: data.message,
                user: data.user
            }
            messages.push(newMessage)
            const messagesArray = JSON.stringify(messages,null,2)
            await fs.promises.writeFile(this.path,messagesArray)
            return newMessage
        } catch (error) {
            console.log({error})
        }
    }

}
module.exports = MessageManager