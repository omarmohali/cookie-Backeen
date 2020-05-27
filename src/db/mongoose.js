const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");

const dbConnectionString = "mongodb://localhost:27017/cookieDBTest";

mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true
});
