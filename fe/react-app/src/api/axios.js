import axios from "axios";

const endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;
const api = axios.create({
    baseURL : "http://localhost:8000"
});

export default api;