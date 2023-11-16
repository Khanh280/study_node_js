const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = new Schema({
    username: {
        type: String,
        unique: [true, "Username đã tồn tại"]
    },
    password: {
        type: String,
        required: [true, "Password không được để trống"]
    },
    role: {type: Schema.Types.ObjectId, ref: 'Role'}
})
module.exports = mongoose.model('User', User)
