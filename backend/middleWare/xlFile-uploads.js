const multer = require('multer');

const xlFileUploads = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/xlFiles');
        }
    })
});

module.exports = xlFileUploads;