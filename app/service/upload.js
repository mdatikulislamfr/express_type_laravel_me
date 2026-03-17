const path = require('path');
const fs = require('fs');
const multer = require('multer');
const link = (location) => path.join(global.root, `storages${location}`);
// upload function
const upload = (type = [], error = "Type not include!", sizeMB = 2) => multer({
    limits: { fileSize: parseFloat(sizeMB.toString()) * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        if (type.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error(error), false);
        }
    }
})
const fileUpload = async (name, buffer, location = link("/upload")) => {
    try {
        if (!buffer || !name) throw new Error("File or name is required");
        location = path.join(location, name);
        // ensure folder exists
        const dir = path.dirname(location);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(location, buffer); // no encoding for buffer
        return location;
    } catch (error) {
        throw (error);
    }
};
exports.genaretname = (name) => {
    const rename = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return rename + '-' + name;
}
const fileRemove = async (name) => {
    name = link(name);
    if (fs.existsSync(name)) {
        return fs.unlinkSync(name);
    }
}
const fileGet = (name) => {
    return fs.readFileSync(link(name), "base64");
}
module.exports = { upload, fileRemove, location: link, fileUpload, fileGet }