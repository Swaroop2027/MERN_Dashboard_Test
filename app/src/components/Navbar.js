import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../services/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");

  const handleLogout = async () => {
    try {
      const resData = await logout();
      const { success } = resData;
      if (success) {
        localStorage.clear();
        setTimeout(() => {
          // navigate("/login");
          window.location.replace("/login")
        }, 1000);
      }
    } catch (error) {}
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-6 text-white">
          <li
            className={`cursor-pointer hover:text-gray-300 ${
              location.pathname === "/" ? "font-bold" : ""
            }`}
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className={`cursor-pointer hover:text-gray-300 ${
              location.pathname === "/employees" ? "font-bold" : ""
            }`}
            onClick={() => navigate("/employees")}
          >
            Employee List
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">{username}</span>
          <button
            className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
