import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Add a new question.
 * Expects in req.body: { text: string, type: string, interviewId?: string }
 */
export const addQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, type, interviewId } = req.body;
    if (!text || !type) {
      res.status(400).json({ error: "Missing required fields: text and type" });
      return;
    }
    // Create the new question. If interviewId is provided, include it.
    const newQuestion = await prisma.question.create({
      data: {
        text,
        type,
        ...(interviewId && { interviewId }),
      },
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Failed to add question" });
  }
};

/**
 * Update an existing question.
 * Expects question id in req.params and any of { text, type } in req.body.
 */
export const updateQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // id is a UUID string
    const { text, type } = req.body;
    if (!text && !type) {
      res.status(400).json({ error: "At least one field (text or type) must be provided" });
      return;
    }
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: {
        ...(text ? { text } : {}), 
        ...(type ? { type } : {}),
      },
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Failed to update question" });
  }
};

/**
 * Delete a question by id.
 * Expects question id in req.params.
 */
export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // id is a UUID string
    await prisma.question.delete({ where: { id } });
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Failed to delete question" });
  }
};
