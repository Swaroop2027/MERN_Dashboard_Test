import asyncHandler from "express-async-handler";
import {
  successResponse,
  errorResponse,
  getDocumentsWithPagination,
} from "../../utils/index.js";
import { Employee } from "../../models/index.js";

export const getEmployees = asyncHandler(async (req, res) => {
  const {
    search = "",
    sortField = "createdAt",
    sortOrder = -1,
    page,
    limit,
  } = req.query;

  const query = {
    isDeleted: false,
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobileNumber: { $regex: search, $options: "i" } },
      { designation: { $regex: search, $options: "i" } },
      { course: { $regex: search, $options: "i" } },
    ],
  };

  const result = await getDocumentsWithPagination(Employee, query, {
    sortField,
    sortOrder,
    page,
    limit,
  });

  return successResponse(res, 200, {
    message: "Employee fetched successfully",
    ...result,
  });
});
