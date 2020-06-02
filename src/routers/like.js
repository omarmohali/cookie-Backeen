const express = require("express");
const Like = require("./../models/like");
const User = require("./../models/user");
const Recipe = require("./../models/recipe");


const likeRouter = express.Router();

likeRouter.post("/likes", async (req, res) => {
    
    var user;
    try {
        user = await User.getUserFromToken(req.headers.authorization);
    } catch (err) {
        res.status(401).send(err);
        return;
    }

    try {
        const recipeId = req.body.recipeId;


        const alreadyLiked = await Like.findOne({"user._id": user.id, recipeId: recipeId});
        
        if (alreadyLiked) {
            throw new Error("already liked");
        }

        
        const like = Like({
            recipeId: recipeId,
            user: user
        });

        
        const recipe = await Recipe.findById(recipeId);
        console.log(recipe);
        if(recipe) {
            recipe.likesCount = recipe.likesCount + 1;
        }
        else {
            throw new Error("No recipe with this id");
        }

        await recipe.save();
        await like.save();

        res.send(like);

    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

});


module.exports = likeRouter;