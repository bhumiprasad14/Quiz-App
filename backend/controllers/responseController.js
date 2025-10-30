import ResponseModel from "../Models/Response.js";
import QuizModel from "../Models/Quiz.js";

const submitQuiz = async (req, res) => {
    try {
        const { quizId, studentName, studentEmail, answers } = req.body;
        // Get the quiz with correct answers
        const quiz = await QuizModel.findById(quizId);
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        // Check each answer and calculate score
        let score = 0;
        const checkedAnswers = [];

        for (let i = 0; i < answers.length; i++) {
            const studentAnswer = answers[i];
            const correctQuestion = quiz.questions.find(q => 
                q._id.toString() === studentAnswer.questionId
            );

            if (correctQuestion) {
                const isCorrect = studentAnswer.answer === correctQuestion.answer;
                if (isCorrect) score++;

                checkedAnswers.push({
                    questionId: correctQuestion._id,
                    question: correctQuestion.question,
                    studentAnswer: studentAnswer.answer,
                    correctAnswer: correctQuestion.answer,
                    isCorrect: isCorrect
                });
            }
        }

        const totalQuestions = quiz.questions.length;
        const percentage = Math.round((score / totalQuestions) * 100);

        // Save response to database
        const response = new ResponseModel({
            quizId,
            studentName,
            studentEmail,
            answers: checkedAnswers,
            score,
            totalQuestions,
            percentage
        });

        await response.save();

        res.status(201).json({
            success: true,
            message: "Quiz submitted successfully",
            data: {
                response: {
                    id: response._id,
                    score: score,
                    totalQuestions: totalQuestions,
                    percentage: percentage,
                    answers: checkedAnswers,
                    submittedAt: response.submittedAt
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Quiz submission failed",
            error: {
                code: error.name || "SERVER_ERROR",
                details: error.message
            }
        });
    }
};

// Get all responses for a quiz
const getQuizResponses = async (req, res) => {
    try {
        const { quizId } = req.params;
        
        const responses = await ResponseModel.find({ quizId })
            .populate('quizId', 'title')
            .sort({ submittedAt: -1 });

        res.json({
            success: true,
            message: "Responses retrieved successfully",
            data: {
                responses: responses,
                count: responses.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve responses",
            error: error.message
        });
    }
};

// Get student's response
const getStudentResponse = async (req, res) => {
    try {
        const { responseId } = req.params;
        
        const response = await ResponseModel.findById(responseId)
            .populate('quizId', 'title description');

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Response not found"
            });
        }

        res.json({
            success: true,
            message: "Response retrieved successfully",
            data: {
                response: response
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve response",
            error: error.message
        });
    }
};

export { submitQuiz, getQuizResponses, getStudentResponse };
