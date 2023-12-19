const { Schema, model } = require('mongoose')

const userSchema = Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    unique: true
  },
  age: Number,
  password: String,
  role:{
    type: String,
    default: 'PUBLIC'
  },
  cart:{
    type: Schema.Types.ObjectId,
    ref:'carts'
  },
  createdAt: {
    type:Date,
    default: new Date()
  }
})


module.exports = model('users', userSchema)