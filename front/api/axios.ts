"use client";
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10 * 60 * 1000,
});

instance.interceptors.request.use(
    async function (config) {
        console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL);
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
