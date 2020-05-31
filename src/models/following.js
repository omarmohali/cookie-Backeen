const mongoose = require("mongoose");

const followingSchema = mongoose.Schema({
    userId: {
        type: String
    },
    followingIds: [{
        type: String
    }]
});

const Following = mongoose.model("Following", followingSchema);

module.exports = Following;