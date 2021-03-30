const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    username: { type: String, required: [true , 'username is required']},
    title: { type: String, max: 80 , required: [true , 'Pots title is required'] },
    cat: { type: String },
    desc: { type: String, max: 500 , required: [true , 'Post description is required'] },
    

},
    {
        timestamps: true,
    }

);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;