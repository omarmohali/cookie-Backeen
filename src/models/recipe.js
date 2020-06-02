const mongoose = require("mongoose");
const File = require("./file.js");
const User = require("./user");
const Comment = require("./comment");



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
    likesCount: {
        type: Number,
        default: 0
    },
    user: {
        type: User.schema
    },
    comments: [{
        type: Comment.schema,
        default: []
    }]
}, {
    timestamps: true
});

recipeSchema.index({name: "text", "title": "text"});


recipeSchema.statics.getRecipes = async (searchText, tag) => {

    try {
        var recipes;
        if (!searchText && !tag) {
            recipes = await Recipe.find().sort({ createdAt: -1 });
        }
        else if (searchText && tag) {
            recipes = await Recipe.find({$text: {$search: searchText}, tags: tag});
        }
        else if (searchText) {
            recipes = await Recipe.find({$text: {$search: searchText}});
        }
        else if (tag) {
            recipes = await Recipe.find({tags: tag});
        }

        return recipes;
    } catch (err) {
        throw err;
    }
    
};

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;