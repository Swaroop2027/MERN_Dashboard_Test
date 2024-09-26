import asyncHandler from "express-async-handler";
import {
  successResponse,
  errorResponse,
  createDocument,
  getDocumentByQuery,
} from "../../utils/index.js";
import { Employee } from "../../models/index.js";

export const create = asyncHandler(async (req, res) => {
  const { name, email, mobileNumber, designation, gender, course } = req.body;

  const existingEmployee = await getDocumentByQuery(Employee, {
    $or: [({ email }, { mobileNumber })],
  });
  if (existingEmployee) {
    return errorResponse(res, 400, "Employee already exists");
  }

  const newEmployee = await createDocument(Employee, {
    name,
    email,
    mobileNumber,
    designation,
    gender,
    course,
    imageUrl: req.file ? req.file.path : null,
  });

  return successResponse(res, 201, {
    message: "Employee created successfully",
    newEmployee,
  });
});
