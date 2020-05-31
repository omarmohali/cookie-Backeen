const mongoose = require("mongoose");
const File = require("./file.js");



const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
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
}, {
    timestamps: true
});

recipeSchema.index({name: "text", "title": "text"});


recipeSchema.statics.getRecipes = async (searchText, tags) => {

    try {
        var recipes;
        if (searchText == null) {
            recipes = await Recipe.find().sort({ createdAt: -1 });
        }
        else {
            recipes = await Recipe.find({$text: {$search: searchText}});
        }

        return recipes;
    } catch (err) {
        throw err;
    }
    
};

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;