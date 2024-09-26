import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// Add a request interceptor (if needed)
axiosInstance.interceptors.request.use(
  (config) => {
    // No need to manually handle tokens here, as the cookie will be automatically included
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (for handling errors globally)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors such as 401, 403, etc.
    if (error.response?.status === 401) {
      // Handle unauthorized access (you might want to redirect to login or refresh the token)
      // Add your logic here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
