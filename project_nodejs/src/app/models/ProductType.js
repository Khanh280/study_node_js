const mongoose = require('mongoose')
const schema = mongoose.Schema
const ProductType = new schema({
    name: {
        type: String,
        required: [true, ""]
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('ProductType', ProductType)