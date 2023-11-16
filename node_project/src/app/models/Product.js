const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = new Schema({
    name: {
        type: String,
        required: [true, "Tên sản phẩm không được để trống"],
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
    brands: {type: Schema.Types.ObjectId, ref: 'Brand'},// ref lien ket  sử dụng trong schema của một trường để xác định tên của bảng (collection) trong MongoDB mà trường đó tham chiếu đến.
    types:  {type: Schema.Types.ObjectId, ref: 'Type'}
}, {
    timestamps: true
})
module.exports = mongoose.model('Product', Product)