const multer = require("multer")

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./upload");
    },
    filename: (req, file, cb) => {
      cb(null, `file-${Date.now()}. ${file.originalname}`)
    },
  });
  const Image_Filter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        const err = new Error("Only .jpg .jpeg .png images are supported!");
        err.name = "ExtensionError";
        return cb(err, "err");
      }
    } else {
      callback(null, Error("only image is allowd"));
    }
  };


  const multi_upload = multer({
    storage: Storage,
    // fileFilter: Image_Filter,
  });

  module.exports = multi_upload;