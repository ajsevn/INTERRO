import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Submit a response.
 * Expects in req.body: { interviewId: string, questionId: string, userId: string, answer: string }
 */
export const submitResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { interviewId, questionId, userId, answer } = req.body;
    if (!interviewId || !questionId || !userId || !answer) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newResponse = await prisma.response.create({
      data: {
        interviewId,   // UUID string as per schema
        questionId,    // UUID string as per schema
        userId,        // UUID string as per schema
        answer,        // Candidate's answer text
        // Optionally, add score or other fields here if needed
      },
    });

    res.status(201).json(newResponse);
  } catch (error) {
    console.error("Error submitting response:", error);
    res.status(500).json({ error: "Failed to submit response" });
  }
};

/**
 * Get all responses for a given interview.
 * Expects :interviewId in the URL parameters.
 */
export const getResponses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { interviewId } = req.params;
    if (!interviewId) {
      res.status(400).json({ error: "Interview ID is required" });
      return;
    }
    const responses = await prisma.response.findMany({
      where: { interviewId },
      include: { question: true }, // Include question details if needed
    });
    res.status(200).json(responses);
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ error: "Failed to fetch responses" });
  }
};
