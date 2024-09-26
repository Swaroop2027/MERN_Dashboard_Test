import asyncHandler from "express-async-handler";
import {
  successResponse,
  errorResponse,
  updateDocumentById,
} from "../../utils/index.js";
import { Employee } from "../../models/index.js";

export const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedEmployee = await updateDocumentById(Employee, id, {
    isDeleted: true,
  });

  if (!deletedEmployee) {
    return errorResponse(res, 404, "Employee not found");
  }

  return successResponse(res, 200, {
    message: "Employee deleted successfully",
    deletedEmployee,
  });
});
