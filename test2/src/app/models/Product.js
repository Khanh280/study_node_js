const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = new Schema({
    name: {
        type: String,
        required: [true, "Tên sản phẩm không được để trống"],
        unique: [true,"San pham da trung"]
    },
    description: {
        type: String,
        required: [true, "Mô tả không được để trống"]
    },
    price: {
        type: Number,
        required: [true, "Giá tiền không được để trống"],
        min: [1, "Giá tiền phải lớn hơn 0"]
    },
    image: {
        type: String,
        required: [true, "Ảnh không được để trống"]
    },
    brand: {
        type: String,
        required: [true, "Brand không được để trống"]
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Product', Product)