import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const AttemptQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quiz/${quizId}`);
        setQuiz(res.data.quiz);
      } catch (error) {
        alert("Failed to load quiz");
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answersArray = Object.keys(answers).map(questionId => ({
      questionId,
      answer: answers[questionId]
    }));

    try {
      const res = await API.post("/responses/submit", {
        quizId,
        studentName: user.name,
        studentEmail: user.email,
        answers: answersArray
      });
      navigate(`/student/results/${res.data.data.response.id}`);
    } catch (error) {
      alert("Failed to submit quiz");
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>{quiz.title}</h2>
        <p>{quiz.description}</p>
        <form onSubmit={handleSubmit}>
          {quiz.questions.map((q, index) => (
            <div key={q._id} style={{ marginBottom: "20px" }}>
              <h3>{index + 1}. {q.question}</h3>
              {q.options.map((opt, i) => (
                <label key={i} style={{ display: "block" }}>
                  <input type="radio" name={`question-${q._id}`} value={opt} onChange={() => handleAnswerChange(q._id, opt)} required />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button type="submit">Submit Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default AttemptQuiz;
