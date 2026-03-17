const rateLimit = require("express-rate-limit");
exports.appLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 140,
    message: { status: false, error: "Too many login attempts. Try again later." }
});
exports.loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
    message: { status: false, error: "Too many login attempts. Try again later." }
});

exports.signupLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 3,
    message: { status: false, error: "Too many signup attempts. Try again later." }
});