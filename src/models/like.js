const mongoose = require("mongoose");
const User = require("./user");

const likeSchema = mongoose.Schema({
    recipeId: {
        type: String,
        required: true
    },
    user: {
        type: User.schema,
        required: true
    }
});


const Like = mongoose.model("Like", likeSchema);

module.exports = Like;