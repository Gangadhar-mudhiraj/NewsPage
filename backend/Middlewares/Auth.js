import jwt from "jsonwebtoken";
import userModel from "../Models/User.js";
import { ErrorResponse } from "../Utils/ApiResponse.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.signedCookies.token;

        if (!token) {
            return res.status(401).json(new ErrorResponse({
                statusCode: 401,
                message: "Unauthorized",
                error: "Token missing"
            }));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Exclude password field when fetching user
        const user = await userModel.findById(decoded.id).select("-password -preferences");

        if (!user) {
            return res.status(401).json(new ErrorResponse({
                statusCode: 401,
                message: "Unauthorized",
                error: "User not found"
            }));
        }

        req.user = user;

        next(); // allow access to the protected route
    } catch (error) {
        return res.status(401).json(new ErrorResponse({
            statusCode: 401,
            message: "Invalid or expired token",
            error: error.message
        }));
    }
};

export default isAuthenticated;
