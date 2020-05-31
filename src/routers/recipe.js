const express = require("express");
const Recipe = require("./../models/recipe.js");
const User = require("./../models/user.js");


const recipeRouter = express.Router();


recipeRouter.get("/recipes", async (req, res) => {

    const queryParams = req.query;
    const searchText = queryParams.searchText;
    const tags = queryParams.tags;

    try {
        var recipes;
        if (searchText == null) {
            recipes = await Recipe.find().sort({ createdAt: -1 });
        }
        else {
            recipes = await Recipe.find({$text: {$search: searchText}});
        } 
        res.send(recipes);
    } catch (err) {
        res.status(400).send(err);
    }
    
})

recipeRouter.post("/recipes", async (req, res) => {


    

    var user;
    try {
        user = await User.getUserFromToken(req.headers.authorization);
    } catch (err) {
        res.status(401).send(err);
        return;
    }
    
    try {
        var recipe = Recipe(req.body);
        recipe.userId = user._id;
        recipe = await recipe.save();
        user.recipeIds.push(recipe._id);
        await user.save();
        res.send(recipe);
    }
    catch(err) {
        res.status(400).send(err);
    }

});

module.exports = recipeRouter;
