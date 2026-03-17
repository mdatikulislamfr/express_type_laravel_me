const { body, param, validationResult } = require("express-validator");

const uservalidator = {

    add: [
        body("name").notEmpty().isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    error: (req, res, next) => {
        const error = validationResult(req);
        console.log('Validation Errors:', error.array());
        if (!error.isEmpty()) {
            return res.error(error.array().filter((err) => err.msg).map((err) => err.msg).join(', '));
        }
        next();
    }
}
module.exports = uservalidator;