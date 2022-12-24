const imageUpload = require('../services/image_upload');
const catchAsync = require('../utils/catchAsync');

const Upload = catchAsync(async(req, res) => {
    if (req.files != '') {
        let files = req.files;

        if (files) {
            const { buffer, originalname } = files[0];
            let aadharPATH = await imageUpload.upload(buffer, originalname);
            let response = {};
            response.success = true;
            response.location = aadharPATH.Location;
            res.send(response);
        }
    } else {
        let response = {};
        response.success = false;
        res.send(response);
    }
});

module.exports = {
    Upload
};