class DatetimeConfig {
    timezone = "en-US";
    today = () => (new Date()).toLocaleDateString(this.timezone)
    time = () => (new Date()).toLocaleTimeString(this.timezone)
    bd = (string) => {
        if (!string) throw ("string not found!")
        const date = new Date(string);
        const bdDate = date.toLocaleString("en-BD", {
            timeZone: "Asia/Dhaka",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
        return bdDate;
    }
}
module.exports = new DatetimeConfig();