import { Router } from "express";
import { signupValidation, loginValidation } from "../Middlewares/validation.js";
import { SuccessResponse } from "../Utils/ApiResponse.js";
import { signup, login, logout, updateUser, getPreferences } from "../Controllers/Auth.controller.js";
import isAuthenticated from "../Middlewares/Auth.js";

const router = Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/logout", isAuthenticated, logout);
router.get("/status", isAuthenticated, (req, res) => {
    return res.status(200).json(new SuccessResponse({
        message: "Authenticated",
        data: { email: req.user.email }
    }));
});
router.put("/update", isAuthenticated, updateUser)

router.get("/", isAuthenticated, getPreferences)

export default router;
