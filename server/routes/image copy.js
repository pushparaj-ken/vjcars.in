const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })



const imageController = require('../controller/image');

router.post('/upload', upload.array('image', 10), imageController.Upload);


module.exports = router