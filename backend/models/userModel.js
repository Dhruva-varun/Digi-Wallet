const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    idType:{
        type: String,
        required: true,
    },
    idNumber:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    balance:{
        type: Number,
        default: 0,
    },
    password:{
        type: String,
        required: true,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Users", userSchema);