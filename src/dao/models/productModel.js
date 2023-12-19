const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        set: value => parseFloat(value),
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        set: value => parseInt(value),
    },
    category: {
        type: String,
        required: true,
    },
    thumbnails: {
        type: Array,
        validate: {
            validator: value => {
                if (!value) {
                    return []
                }
            }
        }
    },
})
productSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('products', productSchema);