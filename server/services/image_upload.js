const AWS = require("aws-sdk");
const Sharp = require("sharp");
const AllConstants = require("../services/constants");

const config = {
    apiVersion: "2006-03-01",
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
};

var s3 = new AWS.S3(config);

exports.upload = (file, fileName) => {

    return new Promise((resolve, reject) => {
        let params = {
            Body: '',
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName
        };

        let split_fileName = fileName.split(".");
        let extension_of_file = split_fileName[1];

        let imgext = AllConstants.ImageExtensions;
        if (imgext.indexOf(extension_of_file) > -1) {
            Sharp(file)
                .webp({ quality: 20 })
                .resize(null, null, {
                    fit: Sharp.fit.inside,
                    withoutEnlargement: true,
                })
                .toBuffer()
                .then(buffer => {
                    params.Body = buffer;
                    s3.upload(params, (error, file) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(file);
                    });
                })
                .catch(error => reject(error));
        } else {
            params.Body = file;
            s3.upload(params, (error, file) => {
                if (error) {
                    reject(error);
                }
                resolve(file);
            });
        }
    });
}

exports.uploadArray = (files) => {
    return new Promise((resolve, reject) => {
        var count = 0;
        let totalCount = files.length + 1;
        for (each in files) {
            let params = {
                Body: '',
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: files[each]["originalname"]
            };
            let FileBuffer = files[each];
            // console.log(files[each]);
            // resize image and upload to S3
            Sharp(files[each])
                .webp({ quality: 20 })
                .resize(null, null, {
                    fit: Sharp.fit.inside,
                    withoutEnlargement: true,
                })
                .toBuffer()
                .then(buffer => {
                    params.Body = buffer;
                    s3.upload(params, (error, FileBuffer) => {
                        if (error) {
                            reject(error);
                        }
                        count = count + 1;
                        if (count == totalCount) {
                            resolve(true);
                        }
                    });
                })
                .catch(error => reject(error));
        }
    });
}