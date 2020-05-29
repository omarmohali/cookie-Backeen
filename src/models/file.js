const mongoose = require("mongoose");


const fileSchema = mongoose.Schema({
    fileUrl: {
        type: String
    }
});


const File = mongoose.model("File", fileSchema);

module.exports = File;