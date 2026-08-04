import axios from "axios";

const endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;
const api = axios.create({
    baseURL : endpoint
});

export default api;