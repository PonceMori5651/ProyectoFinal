const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({

    message:{
        type: String,
        required:true
    },

    user:{
        type:String,
        required: true
    },

    timeStamp:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('messages', messageSchema);