import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (username && password) {
        const resData = await login(username, password);
        const { success, data } = resData;
        if (success) {
          const { message, user } = data;
          toast.success(message);

          localStorage.setItem("username", user.username);
          localStorage.setItem("isLoggedIn", true);
          setIsLoggedIn(true);

          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, []);

  return (
    <>
      <nav className="bg-gray-800 px-4 py-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white font-bold">Login</h1>
        </div>
      </nav>

      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-sm p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
