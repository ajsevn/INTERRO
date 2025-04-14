import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables.");
}

// Extend Express Request Type to Include `user`
declare module "express" {
    interface Request {
        user?: { userId: string; email: string; role: string };
    }
}

// Helper function to generate JWT token
const generateToken = (userId: string, email: string, role: string) => {
    return jwt.sign({ userId, email, role }, JWT_SECRET as string, { expiresIn: "1h" });
};

// ✅ **Register a new user**
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user (default role: CANDIDATE)
        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword, role: role || "CANDIDATE" },
        });

        // Generate JWT token
        const token = generateToken(newUser.id, newUser.email, newUser.role);

        res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, role: newUser.role } });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
};

// ✅ **Login a user**
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        // Generate JWT token
        const token = generateToken(user.id, user.email, user.role);

        res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Failed to log in" });
    }
};

// ✅ **Logout a user (Token Blacklisting - Optional)**
const tokenBlacklist = new Set<string>(); // This should be replaced with Redis in production

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(400).json({ error: "No token provided" });
            return;
        }

        // Add token to blacklist
        tokenBlacklist.add(token);

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "Failed to log out" });
    }
};

// ✅ **Get authenticated user details**
export const getMe = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Not authenticated" });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { id: true, email: true, role: true },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("GetMe error:", error);
        res.status(500).json({ error: "Failed to fetch user details" });
    }
};
