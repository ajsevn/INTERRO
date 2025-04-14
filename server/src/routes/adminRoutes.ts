// src/routes/adminRoutes.ts

import express from 'express';
import { addQuestion, updateQuestion, deleteQuestion } from '../../controllers/adminController';
import { authorize, protect } from '../../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations like managing questions
 */

/**
 * @swagger
 * /api/admin/add-question:
 *   post:
 *     summary: Add a new interview question
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - interviewId
 *               - text
 *               - type
 *             properties:
 *               interviewId:
 *                 type: string
 *                 example: 6423edfd8a78c4f38912d420
 *               text:
 *                 type: string
 *                 example: What are the four pillars of OOP?
 *               type:
 *                 type: string
 *                 example: technical
 *     responses:
 *       201:
 *         description: Question added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/add-question', protect, authorize(['ADMIN']), addQuestion);

/**
 * @swagger
 * /api/admin/update-question/{id}:
 *   put:
 *     summary: Update a question by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the question to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: What is the difference between REST and GraphQL?
 *               type:
 *                 type: string
 *                 example: technical
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       404:
 *         description: Question not found
 */
router.put('/update-question/:id', protect, authorize(['ADMIN']), updateQuestion);

/**
 * @swagger
 * /api/admin/delete-question/{id}:
 *   delete:
 *     summary: Delete a question by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the question to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       404:
 *         description: Question not found
 */
router.delete('/delete-question/:id', protect, authorize(['ADMIN']), deleteQuestion);

export default router;
