const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Brand = new Schema({
    name: {type: String}
})
module.exports = mongoose.model('brands',Brand)