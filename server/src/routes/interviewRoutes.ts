import express from 'express';
import {
  createInterview,
  getInterview,
  getUserInterviews,
  deleteInterview,
} from '../../controllers/interviewController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Interviews
 *   description: Interview management
 */

/**
 * @swagger
 * /api/interviews/create:
 *   post:
 *     summary: Create a new interview
 *     tags: [Interviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - jobRole
 *               - questions
 *             properties:
 *               userId:
 *                 type: string
 *               jobRole:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     type:
 *                       type: string
 *     responses:
 *       201:
 *         description: Interview created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Failed to create interview
 */
router.post('/create', createInterview);

/**
 * @swagger
 * /api/interviews/{id}:
 *   get:
 *     summary: Get a specific interview by ID
 *     tags: [Interviews]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Interview ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Interview fetched successfully
 *       404:
 *         description: Interview not found
 *       500:
 *         description: Failed to fetch interview
 */
router.get('/:id', getInterview);

/**
 * @swagger
 * /api/interviews/user/{userId}:
 *   get:
 *     summary: Get all interviews for a user
 *     tags: [Interviews]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Interviews fetched successfully
 *       500:
 *         description: Failed to fetch user interviews
 */
router.get('/user/:userId', getUserInterviews);

/**
 * @swagger
 * /api/interviews/{id}:
 *   delete:
 *     summary: Delete an interview by ID
 *     tags: [Interviews]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Interview ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Interview deleted successfully
 *       500:
 *         description: Failed to delete interview
 */
router.delete('/:id', deleteInterview);

export default router;
