const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");

const imagePath = path.join(__dirname, "../images")

const storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,imagePath);
    },
    filename: function (req, file, callback) {
        callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})

const upload = multer({storage})

router.post('/', upload.single('image'), (req,res)=>{
    res.status(200).json({message:"Upload Images With Succssfuly"});
})




module.exports = router;