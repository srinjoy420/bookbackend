import { Router } from "express";
import { loginUser, registerUser } from "../controller/auth.controller.js";

const router = Router();

// Register route
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
