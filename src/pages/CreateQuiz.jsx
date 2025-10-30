import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [{ question: "", options: ["", "", "", ""], answer: "" }],
  });
  const navigate = useNavigate();

  const handleChange = (index, field, value) => {
    const updated = [...quiz.questions];
    updated[index][field] = value;
    setQuiz({ ...quiz, questions: updated });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...quiz.questions];
    updated[qIndex].options[oIndex] = value;
    setQuiz({ ...quiz, questions: updated });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { question: "", options: ["", "", "", ""], answer: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/quiz", quiz);
      alert("Quiz created successfully!");
      navigate("/teacher");
    } catch (error) {
      alert("Failed to create quiz");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Create Quiz</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Quiz Title" value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} required />
          <textarea placeholder="Description" value={quiz.description} onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />
          {quiz.questions.map((q, i) => (
            <div key={i} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
              <input type="text" placeholder={`Question ${i + 1}`} value={q.question} onChange={(e) => handleChange(i, "question", e.target.value)} required />
              {q.options.map((opt, j) => (
                <input key={j} type="text" placeholder={`Option ${j + 1}`} value={opt} onChange={(e) => handleOptionChange(i, j, e.target.value)} required />
              ))}
              <input type="text" placeholder="Correct Answer" value={q.answer} onChange={(e) => handleChange(i, "answer", e.target.value)} required />
            </div>
          ))}
          <button type="button" onClick={addQuestion}>Add Question</button>
          <button type="submit">Create Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
