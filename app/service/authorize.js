const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next("Unauthorized");
        }
        if (!allowedRoles.includes(req.user.role)) {
            return next("Forbidden: You do not have access");
        }
        req.roll = req.user.role;
        next();
    };
};

module.exports = authorize;
