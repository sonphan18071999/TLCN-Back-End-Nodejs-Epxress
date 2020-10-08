const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: "mongodb+srv://sonp:Chikiet1@@clusterblogaccessories.w6uag.gcp.mongodb.net/<BlogAccessories>?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-WebBlog-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-WebBlog-${file.originalname}`
    };
  }
});

var uploadFile = multer({ storage: storage }).array("file",5);
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;