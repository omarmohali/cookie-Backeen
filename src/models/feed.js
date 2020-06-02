const mongoose = require("mongoose");
const User = require("./user");

const feedSchema = mongoose.Schema({
    sender: {
        type: User.schema,
        // required: true
    },
    receiver: {
        type: User.schema
    },
    type: {
        type: String,
        required: true
    },
    sharedFeed: {
        type: this
    },
    post: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
});


const Feed  = mongoose.model("Feed", feedSchema);

module.exports = Feed;




