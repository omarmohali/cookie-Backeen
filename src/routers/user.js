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
    });
});

userRouter.post("/users/login", async (req, res, next) => {
    
   try {
        const user = await User.validateUser(req.body.email, req.body.password);
        console.log(user);
        if (user) {
            res.send(user);
        }
        else {
            throw Error("Unable to login");
        }
   } catch (err) {
        res.status(401).send();
   }
    
    

});


module.exports = userRouter;