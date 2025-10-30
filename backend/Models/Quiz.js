import mongoose from "mongoose";

const Schema=mongoose.Schema;

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
});
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now }
});
const QuizModel = mongoose.model("Quiz", quizSchema);
export default QuizModel;