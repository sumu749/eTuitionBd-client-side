import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    if (config.url === "/jwt" || config.url === "/refresh-token") {
        return config;
    }

    const token = localStorage.getItem("access-token");

    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;
        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;
            try {
                const { data } = await api.post("/refresh-token");
                localStorage.setItem("access-token", data.token);
                original.headers.authorization = `Bearer ${data.token}`;
                return api(original);
            } catch {
                localStorage.removeItem("access-token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    },
);

export default api;
