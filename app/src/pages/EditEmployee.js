import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EmployeeForm } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEmployee = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const { state } = useLocation();

  useEffect(() => {
    setEmployeeData(state);
  }, [state]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Employee</h1>
      {employeeData ? (
        <EmployeeForm
          isEditMode={true}
          employeeData={employeeData}
          toast={toast}
        />
      ) : (
        <p>Loading...</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditEmployee;
