const { database } = require("../../config/db");

module.exports = class Controller {
    database = database;
};