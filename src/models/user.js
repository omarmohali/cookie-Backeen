const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    },
    recipeIds: [{
        type: String,
        required: true
    }],
    accessTokens: [{
        token: String
    }]
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

userSchema.statics.getUserFromToken = async function (token) {

    if (!token) {
        throw new Error("Unable to verify");
    }

    const tokenPayload = jwt.verify(token, "SECRETKEY");
    try {
        
        if (tokenPayload._id) {
            const user = await User.findOne({_id: tokenPayload._id});
            
            var tokenStillValid = false;
            for (currentToken of user.accessTokens) {
                if (currentToken.token == token) {
                    tokenStillValid = true;
                    break;
                }
            }

            if (tokenStillValid) {
                return user;
            }
            else {
                throw new Error("Unable to verify");
            }
        }
        else {
            throw new Error("Unable to verify");
        }
    } catch (err) {
        throw err;
    }

}

userSchema.methods.generateToken = function() {
    var token = jwt.sign({ _id: this._id }, "SECRETKEY");
    this.accessTokens.push({token: token});
    this.save()
    return token;
}

userSchema.methods.toJSON = function() {
    var object  = this.toObject();
    delete object.password;
    delete object .accessTokens;
    return object;
}


const User = mongoose.model("User", userSchema);

module.exports = User;