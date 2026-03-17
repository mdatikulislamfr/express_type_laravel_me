const express = require("express");
global.root = __dirname;
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const corsConfig = require("./config/cors");
const { appLimiter } = require("./app/utils/rateLimit");
const appSetting = require("./app/middleware/appSetting");
const { createServer } = require("http");
const { Server } = require("socket.io");
const ioSystems = require("./app/event/io.event");
require("dotenv").config({ path: path.join(global.root, ".env") });
const app = express();
const NodeServer = createServer(app);
const io = new Server(NodeServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
global.io = io;
ioSystems(io);
app.set('trust proxy', 1);
// set ejs view
app.set("view engine", "ejs");
app.set("views", path.join(global.root, "resources", "views"));
// Security
app.use(helmet());
app.use(compression());
app.use(corsConfig()); // impordent
app.use(appLimiter);
// app.use(xss());
// Core
app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use("/", appSetting);
// API
app.use("/", (req, res, next) => { req.reqType = "web"; next() });
app.use("/api", (req, res, next) => { req.reqType = "api"; next() });
app.use("/", (req, res, next) => {
    res.success = (message, data = {}) => {
        if (req.reqType === "api") {
            return res.status(200).json({ error: false, message, data });
        } else {
            return res.status(200).send(message);
        }
    };
    res.error = (message, data = {}) => {
        if (req.reqType === "api") {
            return res.status(200).json({ error: true, message, data });
        } else {
            return res.status(200).send(message);
        }
    };
    next();
});
// Health check
app.get("/health", (_, res) => res.json({ status: "ok" }));
// -------------------------------------------------------------


// -------------------------------------------------------------

app.use((err, req, res, next) => {
    console.error(err);
    return res.status(400).json({ error: true, message: err, data: {} });
});
NodeServer.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT || 3000}`);
});
