import AWS from "aws-sdk";
import dotenv from "dotenv";
import s3Stream from "s3-upload-stream";

dotenv.config();

AWS.config.setPromisesDependency();
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: "2006-03-01",
};

AWS.config.update(awsConfig);
const s3 = new AWS.S3();

const stream = s3Stream(s3);

const CustomStorage = function (options) {
  class CustomStorage {
    constructor() {
      return;
    }

    _createOutputStream(filepath, cb, options) {
      const output = fs.createWriteStream(filepath);
      output.on("error", cb);
      output.on("finish", function () {
        cb(null, {
          destination: options.uploadPath,
          baseUrl: options.uploadPath,
          filename: path.basename(filepath),
          storage: options.storage,
          ACL: "public-read",
        });
      });

      return output;
    }

    _handleFile(req, file, cb) {
      console.log(req.user._id.toString());
      console.log(file.size);
      const upload = stream.upload({
        Bucket: "rahulsreimbursement",
        Key: `docs/${req.user._id.toString()}_${file.originalname}`,
      });

      file.stream.pipe(upload);

      upload.on("error", function (error) {
        console.log(error);
        cb(error);
      });

      upload.on(" part", function (details) {
        console.log(details);
      });
      upload.on("uploaded", function (details) {
        console.log(details);
        cb(null, { details: details });
      });
    }

    _removeFile(req, file, cb) {
      console.log(req.user._id.toString());
      s3.deleteObject(
        {
          Bucket: "rahulsreimbursement",
          Key: `docs/${req.user._id.toString()}_${file.originalname}`,
        },
        (err, data) => {
          console.log(err, data);
          cb(null);
        }
      );
    }
  }

  return new CustomStorage(options);
};
// Certificate of Attendance (RH134-8.2).pdf

export default CustomStorage;
