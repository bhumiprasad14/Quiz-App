import express from "express";

import { createQuiz, getQuizzes, getQuizById } from "../controllers/quizcontroller.js";
import { protect, restrictTo, } from "../middleware/authMiddleware.js";

const router=express.Router();
router.post("/",protect,restrictTo("teacher"),createQuiz);
router.get("/",protect,getQuizzes);
router.get("/:id",protect,getQuizById);
export default router;