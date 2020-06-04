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

        

        const recipe = await Recipe.findById(recipeId);

        const comment = Comment({
            commentText: commentText,
            user: user
        })
        var comments = recipe.comments;
        comments.push(comment);
        await recipe.save();
        res.send(comment);

    } catch (err) {
        console.log(err);
        res.status(400).send()
    }

});

commentRouter.delete("/comments/:commentId", async (req, res) => {
    var user;
    try {
        user = await User.getUserFromToken(req.headers.authorization);
    } catch (err) {
        res.status(401).send(err);
        return;
    }



    try {
        const commentId = req.params.commentId;
        const recipeId = req.body.recipeId;

        if (!commentId || !recipeId) {
            throw new Error("Missing Fields");
        }
        
        await Recipe.update({_id: recipeId}, {$pull: {comments: { _id: commentId }}});

        res.send();
        
    } catch (err) {
        console.log(err);
        res.status(400).send()
    }

});


module.exports = commentRouter;