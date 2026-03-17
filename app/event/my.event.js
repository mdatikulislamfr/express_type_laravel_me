const { EventEmitter } = require("events");
const AppEvent = new EventEmitter();
const AppEventType = {
    call: "call",
    global: "global",
    NOTIFACATION: "recive-notifacation"
};

module.exports = { AppEvent, AppEventType };