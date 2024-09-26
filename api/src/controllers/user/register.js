import asyncHandler from "express-async-handler";
import {
  successResponse,
  errorResponse,
  createDocument,
  getDocumentByQuery,
} from "../../utils/index.js";
import { User } from "../../models/index.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;

  const existingUser = await getDocumentByQuery(User, { email });
  if (existingUser) {
    return errorResponse(res, 400, "User already exists");
  }

  const newUser = await createDocument(User, {
    name,
    email,
    username,
    password,
  });
  return successResponse(res, 201, newUser);
});
