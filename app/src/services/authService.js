import { axiosInstance } from "../utils";

// Login service (if your backend still returns a response, but sets the cookie internally)
export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post("/user/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// Logout service (clear the cookies server-side)
export const logout = async () => {
  try {
    const response = await axiosInstance.post("/user/logout");
    return response.data;
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};
