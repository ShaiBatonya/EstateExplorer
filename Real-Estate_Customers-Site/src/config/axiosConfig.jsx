import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-Type" : "application/json",
    },
    // params : {} // optional
});


export default axiosInstance