const path = require('path');

require('dotenv').config(path.join(__dirname,"..",".env"));
const applicationConfig = {
    // ---------------------------------------
    // APPLICATION INFO
    // ---------------------------------------
    name: process.env.APP_NAME || "MyNodeFramework",
    env: process.env.NODE_ENV || "local",
    url: process.env.APP_URL || "http://localhost:3000",
    asset_url: process.env.ASSET_URL || "/",
    debug: process.env.APP_DEBUG === "true" || true,
    key: process.env.APP_KEY || "base64:randomGeneratedKey",
    timezone: process.env.TZ || "UTC",
    locale: process.env.APP_LOCALE || "en",
    fallback_locale: process.env.APP_FALLBACK_LOCALE || "en",

    // ---------------------------------------
    // SERVER
    // ---------------------------------------
    host: process.env.APP_HOST || "127.0.0.1",
    port: process.env.PORT || 3000,
    protocol: process.env.APP_PROTOCOL || "http",

    // ---------------------------------------
    // SECURITY
    // ---------------------------------------
    csrf_key: process.env.CSRF_KEY || "csrf_secret_key",
    jwt_secret: process.env.JWT_SECRET || "jwt_secret_key",
    encryption_key: process.env.ENCRYPTION_KEY || "encrypt_secret",
    hash_driver: "bcrypt",
    session_key: process.env.SESSION_KEY || "session_secret",

    // ---------------------------------------
    // DATABASE
    // ---------------------------------------
    database: {
        driver: process.env.DB_CONNECTION || "mysql",
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || 3306,
        name: process.env.DB_DATABASE || "app_db",
        user: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "",
    },

    // ---------------------------------------
    // MAIL
    // ---------------------------------------
    mail: {
        driver: process.env.MAIL_DRIVER || "smtp",
        host: process.env.MAIL_HOST || "smtp.gmail.com",
        port: process.env.MAIL_PORT || 587,
        username: process.env.MAIL_USERNAME || "",
        password: process.env.MAIL_PASSWORD || "",
        from: {
            address: process.env.MAIL_FROM_ADDRESS || "noreply@app.com",
            name: process.env.MAIL_FROM_NAME || "MyNodeFramework",
        },
    },

    // ---------------------------------------
    // CACHE / QUEUE
    // ---------------------------------------
    cache: {
        driver: process.env.CACHE_DRIVER || "file",
        ttl: process.env.CACHE_TTL || 3600,
    },

    queue: {
        driver: process.env.QUEUE_DRIVER || "sync",
    },

    // ---------------------------------------
    // STORAGE
    // ---------------------------------------
    storage: {
        driver: process.env.STORAGE_DRIVER || "local",
        path: process.env.STORAGE_PATH || "storage/app",
        public_path: process.env.PUBLIC_PATH || "public",
    },

    // ---------------------------------------
    // LOGGING
    // ---------------------------------------
    log: {
        channel: process.env.LOG_CHANNEL || "file",
        level: process.env.LOG_LEVEL || "debug",
        path: process.env.LOG_PATH || "storage/logs/app.log",
    },


    // ---------------------------------------
    // LOGGING
    // ---------------------------------------
    sms: {
        key: process.env.SMS_KEY || "",
        url: process.env.SMS_URL || "",
        id: process.env.SMS_SENDER_ID || "",
    }
};
/**
 * @param {import("./type/AppConfigKeys").AppConfigKeys} key
 */
module.exports = function app(key) {
    return key.split('.').reduce((obj, i) => obj?.[i], applicationConfig);
};
