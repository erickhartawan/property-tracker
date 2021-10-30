const mongoose = require("mongoose")

const adminASchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})


const Admin = mongoose.model("Admin", adminASchema)

module.exports = Admin