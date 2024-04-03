const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default:"user"
        // enum: ["admin", "user"]
    }
});


module.exports = mongoose.model("users", userSchema);