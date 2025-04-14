import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface DecodedUser {
    userId: string;
    email: string;
    role: "CANDIDATE" | "ADMIN"; // Adjust roles as needed
}

interface AuthRequest extends Request {
    user?: DecodedUser;
}

// Middleware to verify JWT
export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        res.status(401).json({ error: "No token found. Authorization denied!" });
        return;
    }

    try {
        token = token.split(" ")[1]; // Extract token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedUser;
        req.user = decoded;
        next(); // Move to next middleware
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token. Please log in again." });
        return;
    }
};

// Middleware for role-based access control
export const authorize = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ error: "Access denied. Insufficient permissions." });
            return;
        }
        next();
    };
};
