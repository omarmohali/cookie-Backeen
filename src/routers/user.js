const express = require("express");
const bcrypt = require('bcryptjs');
const User = require("./../models/user.js");


const userRouter = express.Router();

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


module.exports = userRouter;