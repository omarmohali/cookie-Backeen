const mongoose = require("mongoose");
const File = require("./file.js");



const recipeSchema = mongoose.Schema({
    ingredients: [{
        type: String,
        required: true
    }],
    procedure: {
        type: String,
    },
    imagesUrls: [{
        type: File.schema
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