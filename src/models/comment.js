const mongoose = require("mongoose");
const User = require("./user");


const commentSchema = mongoose.Schema({
    commentText: {
        type: String,
        required: true
    },
    user: {
        type: User.schema,
        required: true
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;