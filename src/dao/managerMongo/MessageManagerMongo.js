const messageModel = require('../models/messageModel');
class MessageManagerMongo{
    constructor(){
        this.model = messageModel
    }
    async getMessages() {
        const messages = await this.model.find()
        return messages.map(e=>e.toObject())
    }
    createMessage(data){
        return this.model.create(data)
    }

    getMessageById (id){
        return this.model.findById(id)
            .then(message=>{
                if(!message){
                    throw new Error('Message No encontrado')
                }
                return message
            })
    }

    updateMessage (id, data){
        return this.model.findByIdAndUpdate(id,{$set:data})
            .then(message=>{
                if(!message){
                    throw new Error('Message No encontrado')
                }
                return this.model.getMessageById(id)
            })
    }
    deleteMessage (id){
        return this.model.findByIdAndDelete(id)
            .then(Message=>{
                if(!Message){
                    throw new Error('Message No encontrado')
                }
                return true
            })
    }
}

module.exports = MessageManagerMongo