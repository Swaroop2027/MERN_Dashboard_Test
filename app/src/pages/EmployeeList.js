import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeTable } from "../components";
import { deleteEmployee, getAllEmployees } from "../services/employeeService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const totalCount = employees?.docs?.length;

  const fetchEmployees = async (
    searchQuery = "",
    currentPage = 1,
    sortField = "",
    sortOrder = ""
  ) => {
    try {
      const resData = await getAllEmployees(
        searchQuery,
        currentPage,
        sortField,
        sortOrder
      );
      const { data } = resData;

      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    navigate("/edit-employee", { state: employee });
  };

  const handleDelete = async (id) => {
    try {
      const resData = await deleteEmployee(id);
      const { success, data } = resData;
      if (success) {
        const { message } = data;
        fetchEmployees();
        toast.success(message);
      }
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Employee List</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg text-gray-600">
          Total Employees: {totalCount}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/create-employee")}
        >
          Create Employee
        </button>
      </div>

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={fetchEmployees}
      />
      <ToastContainer />
    </div>
  );
};

export default EmployeeList;
