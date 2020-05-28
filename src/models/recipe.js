const mongoose = require("mongoose");



const recipeSchema = mongoose.Schema({
    ingredients: [{
        type: String,
        required: true
    }],
    procedure: {
        type: String,
    },
    imagesUrls: [{
        type: String,
        required: true
    }],
    videoUrl: {
        type: String
    },
    tags: [{
        type: String,
        required: true
    }],
    userId: {
        type: String
    }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;