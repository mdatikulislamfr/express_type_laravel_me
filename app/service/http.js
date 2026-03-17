const axios = require("axios");

class Http {
    constructor() {
        this.url = `http://store.theoxb.live/api/v1`;
        this.headers = {
            "Authorization": "Bearer 40432035388f0f5b7d77",
            "date": "2025-12-30"
        }
    }
    post(url, data, option = {}) {
        url = this.url ? this.url + "/" + url : url;
        option.headers = this.headers;
        return axios.post(url, data, option);
    }

    get(url, option = {}) {
        url = this.url ? this.url + "/" + url : url;
        option.headers = this.headers;
        return axios.get(url, option);
    }

    put(url, data, option = {}) {
        url = this.url ? this.url + "/" + url : url;
        option.headers = this.headers;
        return axios.put(url, data, option);
    }

    patch(url, data, option = {}) {
        url = this.url ? this.url + "/" + url : url;
        option.headers = this.headers;
        return axios.patch(url, data, option);
    }

    delete(url, option = {}) {
        url = this.url ? this.url + "/" + url : url;
        option.headers = this.headers;
        return axios.delete(url, option);
    }
}

module.exports = new Http();
