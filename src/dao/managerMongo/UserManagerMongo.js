const userModel = require('../models/userModel');
const CartManagerMongo = require('./CartManagerMongo')
const {createHash,isValidPassword} = require('../../utils/passwordHash')

const managerC = new CartManagerMongo()
class UserManagerMongo{
    constructor(){
        this.model = userModel
    }
    async getUsers() {
        const users = await this.model.find()
        return users.map(e=>e.toObject())
    }
    async createUser(data){
        const user = await userModel.findOne({email:data.email})
        if(user){
            return false
        }
        if(data.password){
            data.password = createHash(data.password)
            let userCreated = await this.model.create(data)
            
            if(!data.cart){
                let cartCreated = await managerC.createCart({name:"Default"})
                await this.model.findByIdAndUpdate(userCreated._id,{$set:{cart:cartCreated._id}})
            }
            delete data.password
            return userCreated
        }
        return false
    }
    getUserById (id){
        return this.model.findById(id)
            .then(user=>{
                if(!user){
                    throw new Error('User No encontrado')
                }
                return user
            })
    }
    async getLoginTercero (data){
        const user = await userModel.findOne({email:data.email})
        if(user){
            return user
        }
        if(data.password){
            data.password = createHash(data.password)
        }
        let userCreated = await this.model.create(data)
        userCreated = userCreated.toObject()
        delete userCreated.password
        return userCreated
    }

    loginValidation (data){
        return this.model.findOne({email:data.email})
            .then(async user=>{
                if(!user){
                    return false
                }
                if(isValidPassword(data.password,user.password)){
                    user = user.toObject()
                    delete user.password
                    if(!user.cart){
                        let cartCreated = await managerC.createCart({name:"Default"})
                        await this.model.findByIdAndUpdate(user._id,{$set:{cart:cartCreated._id}})
                    }
                    return user
                }
                return false
            })
    }

    async updatePassword (data){
        if(data.password.length===0){
            throw new Error('Ingrese una contraseña valida')
        }
        data.password = createHash(data.password)
        const passUpdated = await this.model.updateOne({email:data.email},{$set:{password:data.password}})
        if(passUpdated.modifiedCount!==1){
            throw new Error('Email no existe')
        }
        return true 
    }
    /*
    deleteMessage (id){
        return this.model.findByIdAndDelete(id)
            .then(Message=>{
                if(!Message){
                    throw new Error('Message No encontrado')
                }
                return true
            })
    }*/
}

module.exports = UserManagerMongo