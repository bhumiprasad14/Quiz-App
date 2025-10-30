import express from "express";
import { submitQuiz, getQuizResponses, getStudentResponse } from "../controllers/responseController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit quiz answers
router.post("/submit",protect,restrictTo("student"), submitQuiz);

// Get all responses for a specific quiz
router.get("/quiz/:quizId", getQuizResponses);

// Get specific student response
router.get("/:responseId", getStudentResponse);

export default router;
