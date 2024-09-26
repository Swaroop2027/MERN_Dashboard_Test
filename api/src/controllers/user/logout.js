import asyncHandler from "express-async-handler";
import { successResponse } from "../../utils/index.js";
import { nodeEnv } from "../../config/index.js";

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: nodeEnv === "production",
    sameSite: "Strict",
  });

  return successResponse(res, 200, { message: "Logout successful" });
});
