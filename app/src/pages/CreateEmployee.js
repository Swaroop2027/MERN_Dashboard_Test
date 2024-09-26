import React from "react";
import { EmployeeForm } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEmployeePage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Employee</h1>
      <EmployeeForm isEditMode={false} toast={toast} />
      <ToastContainer />
    </div>
  );
};

export default CreateEmployeePage;
