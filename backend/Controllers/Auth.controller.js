import asyncHandler from "../Utils/AsyncHandler.js";
import { SuccessResponse, ErrorResponse } from "../Utils/ApiResponse.js";
import bcrypt from "bcrypt";
import userModel from "../Models/User.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    signed: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
};

export const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
        return res.status(400).json(new ErrorResponse({
            statusCode: 400,
            message: "Invalid data",
            error: "All fields are required"
        }));
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json(new ErrorResponse({
            statusCode: 400,
            message: "User already exists",
            error: "Email already registered"
        }));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ name, email, password: hashedPassword });

    return res.status(201).json(new SuccessResponse({
        message: "Signup successful",
        data: { name: newUser.name, email: newUser.email }
    }));
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log(req.body);

    if (!(email && password)) {
        return res.status(400).json(new ErrorResponse({
            statusCode: 400,
            message: "Invalid data",
            error: "Email and password are required"
        }));
    }

    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(403).json(new ErrorResponse({
            statusCode: 403,
            message: "Invalid credentials",
            error: "Email or password is incorrect"
        }));
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("token", token, cookieOptions);
    res.cookie("email", user.email, { ...cookieOptions, httpOnly: false }); // visible to client if needed

    return res.status(200).json(new SuccessResponse({
        message: "Login successful",
        data: { email: user.email }
    }));
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token", cookieOptions);
    res.clearCookie("email", { ...cookieOptions, httpOnly: false });

    req.user = null;
    return res.status(200).json(new SuccessResponse({
        message: "Logout successful"
    }));
});


export const updateUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json(new ErrorResponse({
            statusCode: 401,
            message: "Unauthorized - user not found"
        }));
    }

    const { preferences } = req.body;

    if (!preferences) {
        return res.status(400).json(new ErrorResponse({
            statusCode: 400,
            message: "Preferences data is required"
        }));
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
        return res.status(404).json(new ErrorResponse({
            statusCode: 404,
            message: "User not found"
        }));
    }

    user.preferences = preferences;
    await user.save();

    return res.status(200).json(new SuccessResponse({
        statusCode: 200,
        data: { preferences: user.preferences },
        message: "Preferences updated successfully"
    }));
});


export const getPreferences = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(400).json(new ErrorResponse({
            statusCode: 400,
            message: "No user found"
        }));
    }

    const user = await userModel.findById(req.user._id).select("-password");

    if (!user) {
        return res.status(400).json(new ErrorResponse({
            statusCode: 400,
            message: "No user found"
        }));
    }

    return res.status(200).json(new SuccessResponse({
        message: "Preferences fetched",
        data: { preferences: user.preferences },
        statusCode: 200
    }));
});



