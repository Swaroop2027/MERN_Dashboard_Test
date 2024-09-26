import jwt from "jsonwebtoken";
import { errorResponse, getDocumentById } from "../utils/index.js";
import { jwtSecret } from "../config/index.js";
import { User } from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return errorResponse(res, 401, "No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    const user = await getDocumentById(User, decoded.id);

    if (!user) {
      return errorResponse(res, 401, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    return errorResponse(res, 401, "Not authorized, token failed");
  }
};
