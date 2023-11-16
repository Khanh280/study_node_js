const mongoose = require('mongoose')
const schema = mongoose.Schema
const Product = new schema({
    name: {
        type: String,
        required: [true, ""]
    },
    price: {
        type: Number,
    },
    producttypes: {
        type: schema.Types.ObjectId,
        ref: 'ProductType'// phải giống với tên ở schema Brand
    },
    brands: {
        type: schema.Types.ObjectId,
        ref: 'Brand'
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Product', Product)
