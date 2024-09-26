import asyncHandler from "express-async-handler";
import {
  successResponse,
  errorResponse,
  updateDocumentById,
} from "../../utils/index.js";
import { Employee } from "../../models/index.js";

export const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, mobileNumber, designation, gender, course } = req.body;

  const updatedEmployee = await updateDocumentById(Employee, id, {
    name,
    email,
    mobileNumber,
    designation,
    gender,
    course,
    imageUrl: req.file?.path,
  });

  if (!updatedEmployee) {
    return errorResponse(res, 404, "Employee not found");
  }

  return successResponse(res, 200, {
    message: "Employee updated successfully",
    updatedEmployee,
  });
});
