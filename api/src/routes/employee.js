import { Router } from "express";
import {
  create,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employee/index.js";
import { authMiddleware, uploadFile } from "../middlewares/index.js";

const router = Router();

router.post("/create", authMiddleware, uploadFile, create);
router.get("/get", authMiddleware, getEmployees);
router.put("/update/:id", authMiddleware, uploadFile, updateEmployee);
router.put("/delete/:id", authMiddleware, deleteEmployee);

export default router;
