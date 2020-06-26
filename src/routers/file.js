const express = require("express");
const File = require("../models/file.js");
var multer  = require("multer");

var upload = multer({ dest: "public/data/uploads" });

const imageRouter = express.Router();

imageRouter.post("/files", upload.single("file"), async (req, res) => {

    const file = req.file;
    if (!file) {
        res.status(400).send("Image not provided");
    }
    else {
        const dbFile = File({
            fileUrl: file.path
        });

        try {
            await dbFile.save()
            res.send(dbFile);
        } catch (err) {
            res.status(500).send("Something went wrong");
        }
        
    }
    res.send();
})


module.exports = imageRouter;