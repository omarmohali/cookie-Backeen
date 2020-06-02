const express = require("express");
const Comment = require("./../models/comment");
const User = require("./../models/user");
const Recipe = require("./../models/recipe");



const commentRouter = express.Router();

commentRouter.post("/comments", async (req, res) => {
    var user;
    try {
        user = await User.getUserFromToken(req.headers.authorization);
    } catch (err) {
        res.status(401).send(err);
        return;
    }

    try {
        const commentText = req.body.commentText;
        const recipeId = req.body.recipeId;

        if (!commentText || !recipeId) {
            throw new Error("Missing fields");
        }

        const comment = Comment({
            commentText: commentText,
            user: user
        })

        const recipe = await Recipe.findById(recipeId);
        var comments = recipe.comments;
        comments.push(comment);
        await recipe.save();
        res.send(comments);
        
    } catch (err) {
        console.log(err);
        res.status(400).send()
    }

});


module.exports = commentRouter;