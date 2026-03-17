const cors = require('cors');
module.exports = function corsConfig() {
    return cors({
        origin: [
            "http://localhost:8080",
            "http://localhost:5173"
        ],
        credentials: true
    })
}