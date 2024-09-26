import { Router } from "express";
import { login, logout, register } from "../controllers/user/index.js";
import { authMiddleware } from "../middlewares/index.js";

const router = Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

export default router;
