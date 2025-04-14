import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
// import axios from "axios"; // Optional: for calling an external ML service

const prisma = new PrismaClient();

/**
 * Get all questions for a given interview.
 * Expects :interviewId in the URL.
 */
export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { interviewId } = req.params;
    if (!interviewId) {
      res.status(400).json({ error: "Interview ID is required" });
      return;
    }
    const questions = await prisma.question.findMany({
      where: { interviewId },
    });
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

/**
 * Generate questions based on the interview role.
 * Expects in req.body: { interviewId: string, role: string }
 * This function simulates an external API call to an ML service.
 */
export const generateQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { interviewId, role } = req.body;
    if (!interviewId || !role) {
      res.status(400).json({ error: "Interview ID and role are required" });
      return;
    }

    // Simulate calling an external ML service to generate questions.
    // Replace the code below with an actual API call as needed.
    /*
    const mlResponse = await axios.post("http://localhost:5001/generate-question", { role });
    const generatedQuestions = mlResponse.data.questions;
    */
    // For now, we simulate generated questions:
    const generatedQuestions = [
      { text: "What is your greatest strength?", type: "TEXT" as const },
      { text: "Tell me about a challenging project.", type: "TEXT" as const }
    ];

    // Save generated questions in the database associated with the interview.
    // Using createMany to insert multiple questions.
    await prisma.question.createMany({
      data: generatedQuestions.map((q) => ({
        interviewId,
        text: q.text,
        type: q.type,
      })),
    });

    res.status(201).json({
      message: "Questions generated and saved successfully",
      questions: generatedQuestions,
    });
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
};
