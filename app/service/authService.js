const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { database } = require('../../config/db'); // hypothetical database module
const app = require('../../config/app');
const JWT_SECRET = app("jwt_secret");
// ------------------------------------------------
// LOGIN FUNCTION
// ------------------------------------------------
const login = async (value = {}, tablename = "users") => {
    const obkey = Object.keys(value);
    const obvalue = Object.values(value);
    if (obkey.length !== 2 || obvalue.length !== 2) throw new Error("invalid credentials");
    if (obvalue.some(v => v == "")) throw new Error("invalid credentials");
    const user = await database.table(tablename).where({ [obkey[0]]: obvalue[0] }).first();
    if (!user) throw new Error("invalid credentials");
    const isPasswordValid = await bcrypt.compare(obvalue[1], user[obkey[1]]);
    if (!isPasswordValid) throw new Error("Invalid credentials");
    if (!user.is_active) throw new Error("User account is inactive");
    if (user.trash == "yes") throw new Error("User account is blocked");
    // create JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    // set token in my database or in-memory store if needed
    try {
        await database.table('tokens').insert({
            user_id: user.id,
            table_name: tablename,
            token: token,
            last_login_time: (new Date()).toLocaleString()
        });
        return token;
    } catch (error) {
        throw new Error("Error storing token");
    }
};
const loginByid = async (id, tablename = "users") => {

    const user = await database.table(tablename).where("id", id).first();
    if (!user) throw new Error("invalid credentials");
    if (!user.is_active) throw new Error("User account is inactive");
    if (user.trash == "yes") throw new Error("User account is blocked");
    // create JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    try {
        await database.table('tokens').insert({
            user_id: user.id,
            table_name: tablename,
            token: token,
            last_login_time: (new Date()).toLocaleString()
        });
        return token;
    } catch (error) {
        throw new Error("Error storing token");
    }
};
// ------------------------------------------------
// LOGOUT FROM A DEVICE
// ------------------------------------------------
const logout = async (token) => {
    try {
        await database.table('tokens').where({ token }).del();
        return true;
    } catch (error) {
        throw new Error("Error logging out");
    }
}
// ------------------------------------------------
// ALL TOKEN REOVED FOR USERS IN ALL DEVICES
// ------------------------------------------------
const logoutAllDevice = async (user_id) => {
    try {
        await database.table('tokens').where({ user_id }).del();
        return true;
    } catch (error) {
        throw new Error("Error logging out");
    }
}
// ------------------------------------------------
// -------------------------------export functions--
// ------------------------------------------------
module.exports = { login, logout, logoutAllDevice, loginByid };