// src/routes/questionRoutes.ts

import express from 'express';
import { getQuestions, generateQuestions } from '../../controllers/questionController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question management for interviews
 */

/**
 * @swagger
 * /api/questions/generate:
 *   post:
 *     summary: Generate interview questions based on a job role
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - interviewId
 *               - role
 *             properties:
 *               interviewId:
 *                 type: string
 *                 example: "642ac2e7c3d9e2b123abc456"
 *               role:
 *                 type: string
 *                 example: "Frontend Developer"
 *     responses:
 *       201:
 *         description: Questions generated and saved successfully
 *       400:
 *         description: Interview ID and role are required
 *       500:
 *         description: Failed to generate questions
 */
router.post('/generate', generateQuestions);

/**
 * @swagger
 * /api/questions/{interviewId}:
 *   get:
 *     summary: Get all questions for a given interview
 *     tags: [Questions]
 *     parameters:
 *       - name: interviewId
 *         in: path
 *         required: true
 *         description: ID of the interview
 *         schema:
 *           type: string
 *           example: "642ac2e7c3d9e2b123abc456"
 *     responses:
 *       200:
 *         description: Successfully retrieved questions
 *       400:
 *         description: Interview ID is required
 *       500:
 *         description: Failed to fetch questions
 */
router.get('/:interviewId', getQuestions);

export default router;
