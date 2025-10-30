import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const QuizResponses = () => {
  const { quizId } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await API.get(`/responses/quiz/${quizId}`);
        setResponses(res.data.data.responses || []);
      } catch (error) {
        alert("Failed to load responses");
      }
    };
    fetchResponses();
  }, [quizId]);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Quiz Responses</h2>
        {responses.length === 0 ? (
          <p>No responses yet.</p>
        ) : (
          <ul>
            {responses.map((response) => (
              <li key={response._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                <h3>{response.studentName} ({response.studentEmail})</h3>
                <p>Score: {response.score}/{response.totalQuestions} ({response.percentage}%)</p>
                <p>Submitted: {new Date(response.submittedAt).toLocaleString()}</p>
                <details>
                  <summary>View Answers</summary>
                  <ul>
                    {response.answers.map((ans, index) => (
                      <li key={index}>
                        <p><strong>Question:</strong> {ans.question}</p>
                        <p><strong>Answer:</strong> {ans.studentAnswer}</p>
                        <p><strong>Correct:</strong> {ans.correctAnswer}</p>
                        <p style={{ color: ans.isCorrect ? "green" : "red" }}>
                          {ans.isCorrect ? "✓" : "✗"}
                        </p>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuizResponses;
