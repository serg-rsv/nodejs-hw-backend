const path = require('path');
const multer = require('multer');

const tmpDir = path.join(__dirname, '../', 'tmp');

const storageConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storageConfig });

module.exports = upload;
