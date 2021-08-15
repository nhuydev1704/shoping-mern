const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Hãy nhập name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Hãy nhập email!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Hãy nhập password!"]
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/hunre/image/upload/v1622210328/samples/t%E1%BA%A3i_xu%E1%BB%91ng_2_sf3hpq.jpg"
    },
    totalBuy: {
        type: Number,
        default: 0
    },
    totalOrder: {
        type: Number,
        default: 0
    },
    totalProduct: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('Users', userSchema)