import QuizModel from "../Models/Quiz.js";

const createQuiz = async (req, res) => {
    try {
        const quiz = new QuizModel({
            ...req.body,
            createdBy: req.user.userId
        });
        await quiz.save();
        res.status(200).json({
            message: "Quiz created successfully",
            quiz: quiz
        });
    } catch (error) {
        res.status(500).json({
            message: "Quiz creation failed",
            error: error.message
        });
    }
};

const getQuizzes = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === "teacher") {
            query.createdBy = req.user.userId;
        }
        const quizzes = await QuizModel.find(query);
        res.status(200).json({ quizzes });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch quizzes", error: error.message });
    }
};

const getQuizById = async (req, res) => {
    try {
        const quiz = await QuizModel.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });
        res.status(200).json({ quiz });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch quiz", error: error.message });
    }
};

export { createQuiz, getQuizzes, getQuizById };