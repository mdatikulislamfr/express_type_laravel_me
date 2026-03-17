const dotenv = require('dotenv');
dotenv.config();
exports.asset = (resources)=>{
    return process.env.URL+"/"+resources ;
};