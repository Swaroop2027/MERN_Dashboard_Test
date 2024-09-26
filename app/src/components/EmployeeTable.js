import React, { useState, useEffect } from "react";
import { useDebounce } from "../utils";

function formatDateToIST(dateString) {
  const date = new Date(dateString);

  const istOffset = 330;
  const istTime = new Date(date.getTime() + istOffset * 60000);

  const day = istTime.getDate();
  const year = istTime.getFullYear().toString().slice(-2);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[istTime.getMonth()];

  return `${day}-${month}-${year}`;
}

const EmployeeTable = ({ employees, onEdit, onDelete, onPageChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 1000);

  useEffect(() => {
    onPageChange(debouncedSearch, 1);
  }, [debouncedSearch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field) => {
    onPageChange(debouncedSearch, null, field, 1);
  };

  return (
    <div className="relative shadow-md sm:rounded-lg">
      <div className="flex justify-end p-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 hover:cursor-pointer"
                onClick={() => handleSort("_id")}
              >
                Unique Id ↑
              </th>
              <th scope="col" className="px-3 py-3">
                Image
              </th>
              <th
                scope="col"
                className="px-3 py-3 hover:cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name ↑
              </th>
              <th
                scope="col"
                className="px-3 py-3 hover:cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email ↑
              </th>
              <th scope="col" className="px-3 py-3">
                Mobile No.
              </th>
              <th scope="col" className="px-3 py-3">
                Designation
              </th>
              <th scope="col" className="px-3 py-3">
                Gender
              </th>
              <th scope="col" className="px-3 py-3">
                Course
              </th>
              <th
                scope="col"
                className="px-3 py-3 hover:cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Create Date ↓
              </th>
              <th scope="col" className="px-3 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees?.docs?.map((employee) => (
              <tr key={employee.id} className="bg-white border-b">
                <td className="px-3 py-4">{employee.id}</td>
                <td className="px-3 py-4">
                  <img
                    src={employee.imageUrl}
                    alt="profile"
                    height="20px"
                    width="20px"
                  />
                </td>
                <td className="px-3 py-4">{employee.name}</td>
                <td className="px-3 py-4">{employee.email}</td>
                <td className="px-3 py-4">{employee.mobileNumber}</td>
                <td className="px-3 py-4">{employee.designation}</td>
                <td className="px-3 py-4">{employee.gender}</td>
                <td className="px-3 py-4">{employee.course}</td>
                <td className="px-3 py-4">
                  {formatDateToIST(employee.createdAt)}
                </td>
                <td className="px-3 py-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-4 text-red-600 hover:underline"
                    onClick={() => onDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center p-4">
        <button
          className="bg-gray-200 px-4 py-2 rounded-md"
          disabled={!employees.hasPrevPage}
          onClick={() => onPageChange(debouncedSearch, employees.prevPage)}
        >
          Previous
        </button>

        <span>
          Page {employees.page} of {employees.totalPages}
        </span>

        <button
          className="bg-gray-200 px-4 py-2 rounded-md"
          disabled={!employees.hasNextPage}
          onClick={() => onPageChange(debouncedSearch, employees.nextPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
