import express from 'express';
import { getQuestions, generateQuestions } from '../../controllers/questionController';

const router = express.Router();

router.get('/:interviewId', getQuestions);
router.post('/generate', generateQuestions);

export default router;
