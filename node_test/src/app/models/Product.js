const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    name: {type: String, default: ''},
    description: {type: String, default: ''},
    price: {type: String, default: 0},
    image: {type: String, default: ''},
    brand: {type: String, default: ''},
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', Product)