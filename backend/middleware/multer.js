const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const uploadfile = multer({storage}).single('file') ;

module.exports={uploadfile};