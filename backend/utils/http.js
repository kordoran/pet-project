const { default: axios } = require("axios");

const http = () => {
    const instance = axios.create({
        baseURL: '',
        timeout: 3000,
    });

    const post = async(...params) => {
        try {
            const response = await instance.post(...params);
            console.log("RESPONSE DATA:", response.data);
            return response;
        } catch (err) {
            //console.log(err.response.status);
            //console.log(err.response.data);
            return err.response;
        }
    }

    const get = async(...params) => {
        try {
            const response = await instance.get(...params);
            return response;
        } catch (err) {
            console.log(err.response.status);
            console.log(err.response.data);
            return err.response;
        }
    }

    return { post, get, _instance: instance }
}

module.exports = http();