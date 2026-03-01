import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50_000,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
