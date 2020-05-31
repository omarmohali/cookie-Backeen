const mongoose = require("mongoose");

const followersSchema = mongoose.Schema({
    userId: {
        type: String
    },
    followersIds: [{
        type: String
    }]
});

const Followers = mongoose.model("Followers", followersSchema);

module.exports = Followers;