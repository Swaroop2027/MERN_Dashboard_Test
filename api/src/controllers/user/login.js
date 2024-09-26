import asyncHandler from "express-async-handler";
import { User } from "../../models/index.js";
import {
  successResponse,
  errorResponse,
  getDocumentByQuery,
  generateToken,
} from "../../utils/index.js";
import { nodeEnv } from "../../config/index.js";

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await getDocumentByQuery(User, { username }, "+password");

  if (!user) {
    return errorResponse(res, 400, "Invalid username or password");
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return errorResponse(res, 400, "Invalid username or password");
  }

  user.password = undefined;

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: nodeEnv === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return successResponse(res, 200, { message: "Login successful", user });
});
