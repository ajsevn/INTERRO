import express from 'express';
import { addQuestion, updateQuestion, deleteQuestion } from '../../controllers/adminController';
import { authorize, protect } from '../../middleware/authMiddleware';

const router = express.Router();

router.post("/add-question", protect, authorize(["ADMIN"]), addQuestion);
router.put('/update-question/:id', protect, authorize(["ADMIN"]), updateQuestion);
router.delete('/delete-question/:id', protect, authorize(["ADMIN"]), deleteQuestion);

export default router;