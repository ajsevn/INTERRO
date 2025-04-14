// src/routes/responseRoutes.ts

import express from 'express';
import { submitResponse, getResponses } from '../../controllers/responseController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Responses
 *   description: Manage user responses during interviews
 */

/**
 * @swagger
 * /api/responses/submit:
 *   post:
 *     summary: Submit a response to a question
 *     tags: [Responses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - interviewId
 *               - questionId
 *               - userId
 *               - answer
 *             properties:
 *               interviewId:
 *                 type: string
 *                 example: "642ac2e7c3d9e2b123abc456"
 *               questionId:
 *                 type: string
 *                 example: "641fa2c7e1d2c4a456def123"
 *               userId:
 *                 type: string
 *                 example: "user_abc123"
 *               answer:
 *                 type: string
 *                 example: "I would use useEffect to handle side effects in React."
 *     responses:
 *       201:
 *         description: Response submitted successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to submit response
 */
router.post('/submit', submitResponse);

/**
 * @swagger
 * /api/responses/{interviewId}:
 *   get:
 *     summary: Get all responses for a specific interview
 *     tags: [Responses]
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
 *         description: Successfully retrieved responses
 *       400:
 *         description: Interview ID is required
 *       500:
 *         description: Failed to fetch responses
 */
router.get('/:interviewId', getResponses);

export default router;
