// server/src/routes/responseRoutes.ts
import express from 'express';
import { submitResponse, getResponses } from '../../controllers/responseController';

const router = express.Router();

router.post('/submit', submitResponse);
router.get('/:interviewId', getResponses);

export default router;
