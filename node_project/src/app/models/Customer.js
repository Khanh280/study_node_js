const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Customer = new Schema({
    name: {
        type: String,
        required: [true, ""]
    },
    birthday:{
        type: Date
    },
    phone: {
        type: String,
        required: [true, ""],
    },
    address:{
        type: String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
module.exports = mongoose.model('Customer', Customer)