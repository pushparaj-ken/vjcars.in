const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require("multer");


const upload = multer({});


const imageController = require('../controller/image');

router.post('/upload', upload.any(), imageController.Upload);


module.exports = router
