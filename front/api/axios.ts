"use client";
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10 * 60 * 1000,
});

instance.interceptors.request.use(
    async function (config) {
        console.log(config.baseURL);
        const token = Cookies.get("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    function (error) {
        console.log("Request error: ", error);

        return Promise.reject(error);
    }
);

export { isAxiosError } from "axios";
export default instance;
