import { Router } from "express";
import { registerUser } from "../controller/auth.controller.js";

const router = Router();

// Register route
router.post("/register", registerUser);

export default router;
