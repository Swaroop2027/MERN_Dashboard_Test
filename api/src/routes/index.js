import { Router } from "express";
import user from "./user.js";
import employee from "./employee.js";

const router = Router();

router.use("/user", user);
router.use("/employee", employee);

export default router;
