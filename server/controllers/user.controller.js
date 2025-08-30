import bcrypt from "bcryptjs";// Assuming you have the User model
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { person_name, phnumber, email, password, isAppOwner } = req.body;

        // ✅ Validate required fields
        if (!person_name || !phnumber || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required details"
            });
        }

        // ✅ Validate phone number
        if (!/^[0-9]{10}$/.test(phnumber)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid 10-digit phone number"
            });
        }

        // ✅ Check if user already exists (by email or phone number)
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use"
            });
        }

        const existPhone = await User.findOne({ phnumber });
        if (existPhone) {
            return res.status(400).json({
                success: false,
                message: "Phone number is already in use"
            });
        }

        // ✅ Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // ✅ Create new user
        const createdUser = await User.create({
            person_name,
            phnumber,
            isAppOwner,
            email,
            password: hashedPassword
        });

        // ✅ Send response without token (as per your request)
        return res.status(201).json({
            success: true,
            message: "Registration successful",
            user: {
                _id: createdUser._id,
                person_name: createdUser.person_name,
                phnumber: createdUser.phnumber,
                email: createdUser.email,
                isAppOwner: createdUser.isAppOwner,
            }
        });

    } catch (error) {
        console.error(`controller/usercontroller/signup: Error ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, phnumber, password } = req.body;

        if ((!email && !phnumber) || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email/phone and password"
            });
        }

        // ✅ Find user by email or phone
        const user = await User.findOne(email ? { email } : { phnumber });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // ✅ Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );

        // ✅ Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                person_name: user.person_name,
                email: user.email,
                phnumber: user.phnumber,
                isAppOwner: user.isAppOwner,
            }
        });

    } catch (error) {
        console.error(`controller/usercontroller/login: Error ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        console.error(`controller/usercontroller/logout: Error ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const userId = req.id; // From isAuthenticated middleware
        const { person_name, phnumber, email, password } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (person_name) user.person_name = person_name;
        if (phnumber) {
            if (!/^[0-9]{10}$/.test(phnumber)) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide a valid 10-digit phone number"
                });
            }
            user.phnumber = phnumber;
        }
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                person_name: user.person_name,
                phnumber: user.phnumber,
                email: user.email
            }
        });

    } catch (error) {
        console.error(`controller/usercontroller/updateProfile: Error ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
