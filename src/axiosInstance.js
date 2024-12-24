import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://furnitureapi-ykrq.onrender.com/api";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error);
    console.log("Currently in interceptor");
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log("Refreshing token...");

        const response = await axios.get(
          `${BASE_URL}/auth/refresh`,

          { withCredentials: true }
        );

        console.log("Response from refresh token", response);

        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        console.log("Retrying original request with new token");
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log("Error refreshing token:", err);
        toast.error("Session expired. Please log in again.");
        // localStorage.removeItem("token");
        // window.location.href = "/login"; // Redirect to login page
      }
    } else if (error.response.status === 401) {
      toast.error("Please login first.");
      // window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
