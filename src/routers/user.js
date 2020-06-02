const express = require("express");
const bcrypt = require('bcryptjs');
const User = require("./../models/user.js");
const Followers = require("./../models/followers.js");
const Following = require("./../models/following.js");
const Recipe = require("./../models/recipe.js");
const Feed = require("./../models/feed.js");

const userRouter = express.Router();

userRouter.get("/users", async (req, res) => {

    const searchText = req.query.searchText;
    

    try {
        if (searchText) {
            const users = await User.getUsers(searchText);
            res.send(users);
        }
        else {
            throw Error();
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

userRouter.get("/users/:userId", async (req, res) => {

    try {
        const userId = req.params.userId;
        const user = await User.findOne({_id: userId});
        res.send(user);
    } catch (err) {
        res.status(404).send("User was not found");
    }
    
});

userRouter.post("/users", async (req, res) => {
    
    const user = User(req.body);
    try {
        user.password = await bcrypt.hash(user.password, 8);
        user.save((err, createdUser) => {
            if (err) {
                throw err;
            }
            else {
                const token = user.generateToken();
                res.send({user, token});
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    } 
});

userRouter.post("/users/login", async (req, res, next) => {
    
   try {
        const user = await User.validateUser(req.body.email, req.body.password);
        if (user) {
            const token = user.generateToken();
            res.send({user, token});
        }
        else {
            throw Error("Unable to login");
        }
   } catch (err) {
        res.status(401).send();
   }
    
});

userRouter.post("/users/verifyToken", async (req, res) => {
    const token = req.headers.authorization;
    try {
        var user = await User.getUserFromToken(token.toString());
        res.send(user);
    } catch (err) {
        res.status(401).send();
    }
    

});

userRouter.post("/users/follow", async (req, res) => {
    const token = req.headers.authorization;
    var user;
    try {
        user = await User.getUserFromToken(token);
    } catch (err) {
        res.status(401).send();
        return;
    }

    const userId = user._id.toString();
    const toBeFollowedId = req.body.userId;

    try {

        if (toBeFollowedId) {

            const userToBeFollowed = await User.find({_id: toBeFollowedId});
            if (!userToBeFollowed) {
                throw new Error();
            }

            if (userId == toBeFollowedId) {
                throw new Error();
            }

            // add to followings collection
            var following = await Following.findOne({userId: userId});
            if (following) {
                if (!following.followingIds.includes(toBeFollowedId)) {
                    following.followingIds.push(toBeFollowedId);
                }
            } else {
                following = Following({
                    userId: userId,
                    followingIds: [toBeFollowedId]
                });
            }
            
            // add to followers colloection
            var followers = await Followers.findOne({userId: toBeFollowedId});
            if (followers) {
                if (!followers.followersIds.includes(userId)) {
                    followers.followersIds.push(userId);
                }
            } else {
                followers = Followers({
                    userId: toBeFollowedId,
                    followersIds: [userId]
                });
            }

            await following.save();
            await followers.save();

            res.send()

        }
        else {
            throw new Error();
        }
    } catch (err) {
        res.status(400).send()
    }
       

});

userRouter.get("/users/:userId/feeds", async (req, res) => {
    const userId = req.params.userId

    // get followings of user
    var following;
    try {
        following = await Following.findOne({ userId: userId });
        following = following.followingIds;
        console.log(following);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
    
    try {
        var recipes = [];

        for (var followingId of following) {

            var userRecipes = await Recipe.find({"user._id": followingId}).sort({ createdAt: -1 });
            recipes = recipes.concat(userRecipes);

        }

        recipes.sort((a, b) => { 
            var d1 = Date.parse(a.createdAt);
            var d2 = Date.parse(b.createdAt);
            return d2 - d1;
        });

        var feeds = [];
        for (var recipe of recipes) {
            const feed = new Feed({
                type: "recipe",
                post: recipe
            });
            feeds.push(feed);
        }
        


        res.send(feeds);

    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
    
})


module.exports = userRouter;