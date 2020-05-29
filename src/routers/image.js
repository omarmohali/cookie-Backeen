const express = require("express");
const Image = require("./../models/image.js");
var multer  = require("multer");

var upload = multer({ dest: "data/images" });



const imageRouter = express.Router();

imageRouter.post("/images", upload.single("image"), async (req, res) => {

    const file = req.file;
    if (!file) {
        res.status(400).send("Image not provided");
    }
    else {
        const image = Image({
            imageUrl: file.path
        });

        try {
            await image.save()
            res.send(image);
        } catch (err) {
            res.status(500).send("Something went wrong");
        }
        
    }
    res.send();
})


module.exports = imageRouter;