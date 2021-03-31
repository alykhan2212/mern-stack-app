const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Pots title is required'],
        trim: true
    },
    category: {
        type: String,
        default: 'uncategorized',
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Post description is required'],
        trim: true
    },
},
    {
        timestamps: true,
    }

);


module.exports = mongoose.model("Post", postSchema);