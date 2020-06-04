const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");

// const dbConnectionString = "mongodb://localhost:27017/cookieDBTest";
const dbConnectionString = "mongodb+srv://omarmohali:spetrivi@cookiecluster-pqhgu.mongodb.net/cookieDBTest?retryWrites=true&w=majority";

mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
