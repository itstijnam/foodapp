import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// ✅ Register user
router.post("/signup", signup);

// ✅ Login user
router.post("/login", login);

// ✅ Logout user
router.post("/logout", logout);

// ✅ Update profile (protected)
router.put("/update-profile", isAuthenticated, updateProfile);

export default router;
