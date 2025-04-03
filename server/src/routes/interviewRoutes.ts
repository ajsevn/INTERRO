import express from 'express';
import { createInterview, getInterview, getUserInterviews, deleteInterview } from '../../controllers/interviewController';

const router = express.Router();

router.post('/', createInterview);
router.get('/:id', getInterview);
router.get('/user/:userId', getUserInterviews);
router.delete('/:id', deleteInterview);

export default router;