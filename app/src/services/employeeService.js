import { axiosInstance } from "../utils";

// Get all employees with optional search/filter
export const getAllEmployees = async (
  searchQuery = "",
  page = 1,
  sortField,
  sortOrder,
  limit = 10
) => {
  try {
    const params = {
      page,
      limit,
      ...(searchQuery && { search: searchQuery }),
      ...(sortField && { sortField }),
      ...(sortOrder && { sortOrder }),
    };
    const response = await axiosInstance.get(`/employee/get`, { params });
    return response.data;
  } catch (error) {
    console.error("Get Employees Error:", error);
    throw error;
  }
};

// Get employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await axiosInstance.get(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Employee Error:", error);
    throw error;
  }
};

// Create new employee
export const createEmployee = async (employeeData) => {
  try {
    const response = await axiosInstance.post(`/employee/create`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Create Employee Error:", error);
    throw error;
  }
};

// Update existing employee
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axiosInstance.put(
      `/employee/update/${id}`,
      employeeData
    );
    return response.data;
  } catch (error) {
    console.error("Update Employee Error:", error);
    throw error;
  }
};

// Delete employee by ID
export const deleteEmployee = async (id) => {
  try {
    const response = await axiosInstance.put(`/employee/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete Employee Error:", error);
    throw error;
  }
};
