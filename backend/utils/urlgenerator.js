const DatauriParser = require('datauri/parser');

const path = require('path');

const parser = new DatauriParser();

const generateurl=(file)=>{
    const extname = path.extname(file.originalname).toString();
    return parser.format(extname,file.buffer);
}


module.exports={generateurl}
