const express = require("express");
const User = require("./../models/user.js");


const userRouter = express.Router();

userRouter.post("/users", (req, res) => {
    const user = new User(req.body);
    user.save((err, createdUser) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.send(createdUser);
        }
    })
});


module.exports = userRouter;