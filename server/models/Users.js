const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true,
    })

module.exports = mongoose.model("User", UsersSchema)
