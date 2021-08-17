const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    name: String,
    action: String,
}, {
    timestamps: true
})

module.exports = mongoose.model("Notifications", notificationSchema)