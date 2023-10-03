const imageUpload = require('../services/image_upload');
const commonfunction = require('../controller/common_controller');
const catchAsync = require('../utils/catchAsync');

const Upload = catchAsync(async (req, res) => {
    let values = req.body;
    console.log(values);
    if (values.slug == '') {
        let slug = await slugify(values.title);
        values.slug = slug;
    }
    if (req.files != '') {
        let files = req.files;
        console.log(files);
        if (files) {
            if (files.length == 1) {
                const { buffer, originalname } = files[0];
                let aadharPATH = await imageUpload.upload(buffer, originalname);
                let response = {};
                response.success = true;
                response.location = aadharPATH.Location;
                let tablename = values.tablename;
                let redirecturl = values.url;
                values.images = aadharPATH.Location
                let ResponseJson = await commonfunction.singleRowInsert(tablename, values);
                console.log(ResponseJson.insertId);
                console.log(redirecturl);
                // res.send(ResponseJson);
                return res.redirect(redirecturl);
            }
            else {
                aadharPATH = await UploadMultipleFilesToS3(files, "image");
                let response = {};
                response.success = true;
                response.location = aadharPATH;
                let tablename = values.tablename;
                let redirecturl = values.url;
                for (each in aadharPATH) {

                    values.images = aadharPATH[each]
                    let ResponseJson = await commonfunction.singleRowInsert(tablename, values);
                    console.log(ResponseJson.insertId);
                }

                return res.redirect(redirecturl);

            }
        }
    } else {
        let response = {};
        response.success = false;
        res.send(response);
    }
});

const UpdateUpload = catchAsync(async (req, res) => {
    let values = req.body;
    console.log(values);
    if (values.slug == '') {
        let slug = await slugify(values.title);
        values.slug = slug;
    }
    if (req.files != '') {
        let files = req.files;
        console.log(files);
        if (files) {
            const { buffer, originalname } = files[0];
            let aadharPATH = await imageUpload.upload(buffer, originalname);
            let response = {};
            let redirecturl = values.url;
            response.success = true;
            response.location = aadharPATH.Location;
            let tablename = values.tablename;
            values.images = aadharPATH.Location
            values.id = values.row_id
            let ResponseJson = await commonfunction.singleRowUpdate(tablename, values);
            console.log(ResponseJson);
            // res.send(ResponseJson);
            return res.redirect(redirecturl);
        }

    } else {
        let tablename = values.tablename;
        let redirecturl = values.url;
        // values.images = aadharPATH.Location
        values.id = values.row_id
        let ResponseJson = await commonfunction.singleRowUpdate(tablename, values);
        console.log(ResponseJson);
        return res.redirect(redirecturl);
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

function slugify(text) {
    text = text.replace(/[^\p{L}\d]+/gu, '-');
    text = text.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');
    text = text.replace(/[^-\w]+/g, '');
    text = text.replace(/-+/g, '-');
    text = text.trim().toLowerCase();

    if (text.length === 0) {
        return 'n-a';
    }

    return text;
}

module.exports = {
    Upload,
    UploadMultipleFilesToS3,
    UpdateUpload
};