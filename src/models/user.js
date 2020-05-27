const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Provide a valid email");   
            }
        }
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.plugin(uniqueValidator);

userSchema.statics.validateUser = async function (email, password) {
    const user = await User.findOne({email: email});
    if (!user) {
        throw Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
        return user;
    }
    else {
        throw Error("Unable to login");
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;