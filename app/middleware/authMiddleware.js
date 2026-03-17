const { database } = require('../../config/db');
const Token = require('../model/Token');
const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next("Unauthorized access");
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const toekndata = await Token.where("token","=",token).first();
        if (!toekndata) {
            next("Invalid Token");
            return;
        }
        const decoded = await database.table(toekndata.table_name).where("id", "=", toekndata.user_id).first();
        
        if (!decoded) {
            next("Invalid Token");
            return;
        }
        // extara future
        if (decoded.is_active != '1') {
            next("User is not active");
            return;
        }
        req.token = token;
        req.user = decoded;
        next();
    } catch (err) {
        return next(err);
    }
};

module.exports = authentication;
