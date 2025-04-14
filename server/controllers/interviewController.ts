import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createInterview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, jobRole, questions } = req.body;

        if (!userId || !jobRole || !questions || !Array.isArray(questions)) {
            res.status(400).json({ error: "Invalid input data" });
            return;
        }

        const newInterview = await prisma.interview.create({
            data: {
                user: { connect: { id: userId } },
                jobRole,
                questions: { create: questions },
            },
        });

        res.status(201).json(newInterview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create interview" });
    }
};

export const getInterview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // id is a UUID string
        const interview = await prisma.interview.findUnique({
            where: { id },
            include: { questions: true },
        });
        if (!interview) {
            res.status(404).json({ error: "Interview not found" });
            return;
        }
        res.status(200).json(interview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch interview" });
    }
};

export const getUserInterviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params; // userId is a UUID string
        const interviews = await prisma.interview.findMany({
            where: { userId },
            include: { questions: true },
        });
        res.status(200).json(interviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user interviews" });
    }
};

export const deleteInterview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // id is a UUID string
        await prisma.interview.delete({ where: { id } });
        res.status(200).json({ message: "Interview deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete interview" });
    }
};
