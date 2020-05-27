const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");

const dbConnectionString = "mongodb://localhost:27017/cookieDBTest";

mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true
});


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
    }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

const testUser = new User({
    firstName: "Omaro",
    lastName: "Mohamed",
    email: "omar@omar.cooom"
});

testUser.save((err, user) => {
    if (err) {
        console.log("Error!", err);
    }
    else {
        console.log(user);
    }
});