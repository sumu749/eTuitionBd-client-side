import axios from "axios";

const api = axios.create({
    baseURL: "https://e-tuition-bd-server-side-ud5u.vercel.app",
});

export default api;
