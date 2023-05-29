const imageUpload = require('../services/image_upload');
const catchAsync = require('../utils/catchAsync');

const Upload = catchAsync(async (req, res) => {
    if (req.files != '') {
        let files = req.files;

        if (files) {
            if (files.length == 1) {
                const { buffer, originalname } = files[0];
                let aadharPATH = await imageUpload.upload(buffer, originalname);
                let response = {};
                response.success = true;
                response.location = aadharPATH.Location;
                res.send(response);
            }
            else {
                aadharPATH = await UploadMultipleFilesToS3(files, "image");
                let response = {};
                response.success = true;
                response.location = aadharPATH;
                res.send(response);

            }
        }
    } else {
        let response = {};
        response.success = false;
        res.send(response);
    }
});

const UploadMultipleFilesToS3 = (files) => {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            try {
                console.log("Fileesss---->", files);
                let filesCount = files.length;
                let count = 0;
                if (filesCount > 0) {
                    if (filesCount == 1) {
                        let FilesPathJSON = [];
                        const { buffer, originalname } = files[0];
                        imageUpload.upload(buffer, originalname).then((filePATH) => {
                            FilesPathJSON.push(filePATH.Location);
                            resolve(FilesPathJSON);
                        }).catch(err => reject(err));
                    } else {
                        let FilesPathJSON = [];
                        for (each in files) {
                            var { buffer, originalname } = files[each];
                            imageUpload.upload(buffer, originalname).then((filePATH) => {
                                FilesPathJSON.push(filePATH.Location);
                                count = count + 1;
                                if (count == filesCount) {
                                    resolve(FilesPathJSON);
                                }
                            }).catch(err => reject(err));
                        }
                    }
                } else {
                    reject({
                        success: false,
                        code: 201,
                        Status: "No Files To Upload",
                        "timestamp": new Date()
                    });
                }
            } catch (error) {
                console.error('Something Error');
                console.error(error);
                reject({
                    success: false,
                    code: 201,
                    Status: "Error Uploading Files.",
                    "timestamp": new Date()
                });
            }
        });
    });
}

module.exports = {
    Upload,
    UploadMultipleFilesToS3
};