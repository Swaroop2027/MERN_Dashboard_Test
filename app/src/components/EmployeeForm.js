import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee, updateEmployee } from "../services/employeeService";

const EmployeeForm = ({ isEditMode = false, employeeData = {}, toast }) => {
  const [formData, setFormData] = useState({
    name: employeeData.name || "",
    email: employeeData.email || "",
    mobileNumber: employeeData.mobileNumber
      ? employeeData.mobileNumber.replace("+91", "")
      : "",
    designation: employeeData.designation || "",
    gender: employeeData.gender || "",
    course: employeeData.course || "",
    imageUrl: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "Name is required";
    tempErrors.email = /\S+@\S+\.\S+/.test(formData.email)
      ? ""
      : "Valid email is required";
    tempErrors.mobileNumber =
      formData.mobileNumber.length === 10 &&
      /^[0-9]{10}$/.test(formData.mobileNumber)
        ? ""
        : "Valid 10-digit mobile number is required";
    tempErrors.designation = formData.designation
      ? ""
      : "Designation is required";
    tempErrors.gender = formData.gender ? "" : "Gender is required";
    tempErrors.course = formData.course ? "" : "Course selection is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("mobileNumber", `+91${formData.mobileNumber}`);
    formPayload.append("designation", formData.designation);
    formPayload.append("gender", formData.gender);
    formPayload.append("course", formData.course);
    if (formData.imageUrl) formPayload.append("image", formData.imageUrl);

    try {
      let resData = {};
      if (isEditMode) {
        resData = await updateEmployee(employeeData._id, formPayload);
      } else {
        resData = await createEmployee(formPayload);
      }
      const { success, data } = resData;
      if (success) {
        const { message } = data;
        toast.success(message);
        setTimeout(() => {
          navigate("/employees");
        }, 1000);
      }
    } catch (error) {
      const { message } = error.response.data;
      if (!message) toast.error("Upload jpg/png file only");
      else toast.error(message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
      <div className="bg-white p-6 shadow-md rounded-md w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Employee" : "Create Employee"}
        </h2>

        <div className="mb-2">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              errors.name && "border-red-500"
            }`}
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>

        <div className="mb-2">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              errors.email && "border-red-500"
            }`}
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        <div className="mb-2">
          <label className="block mb-2">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              errors.mobileNumber && "border-red-500"
            }`}
            maxLength="10"
          />
          {errors.mobileNumber && (
            <span className="text-red-500">{errors.mobileNumber}</span>
          )}
        </div>

        <div className="mb-2">
          <label className="block mb-2">Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              errors.designation && "border-red-500"
            }`}
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && (
            <span className="text-red-500">{errors.designation}</span>
          )}
        </div>

        <div className="mb-2">
          <label className="block mb-2">Gender</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
          </div>
          {errors.gender && (
            <span className="text-red-500">{errors.gender}</span>
          )}
        </div>

        <div className="mb-2">
          <label className="block mb-2">Course</label>
          <div className="flex flex-col">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={formData.course === "MCA"}
                onChange={handleChange}
                className="mr-2"
              />
              MCA
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={formData.course === "BCA"}
                onChange={handleChange}
                className="mr-2"
              />
              BCA
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={formData.course === "BSC"}
                onChange={handleChange}
                className="mr-2"
              />
              BSC
            </label>
          </div>
          {errors.course && (
            <span className="text-red-500">{errors.course}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Profile Image</label>
          <input
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          {isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </div>
  );
};

export default EmployeeForm;
