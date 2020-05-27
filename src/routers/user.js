const express = require("express");
const bcrypt = require('bcryptjs');
const User = require("./../models/user.js");


const userRouter = express.Router();

userRouter.post("/users", async (req, res) => {
    const user = new User(req.body);
    
    user.password = await bcrypt.hash(user.password, 8);

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