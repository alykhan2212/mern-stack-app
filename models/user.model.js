const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 5
    },
},
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("User", userSchema);