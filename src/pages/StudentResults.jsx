import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const StudentResults = () => {
  const { responseId } = useParams();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await API.get(`/responses/${responseId}`);
        setResponse(res.data.data.response);
      } catch (error) {
        alert("Failed to load results");
      }
    };
    fetchResponse();
  }, [responseId]);

  if (!response) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Quiz Results</h2>
        <p>Score: {response.score}/{response.totalQuestions} ({response.percentage}%)</p>
        <h3>Answers:</h3>
        <ul>
          {response.answers.map((ans, index) => (
            <li key={index}>
              <p><strong>Question:</strong> {ans.question}</p>
              <p><strong>Your Answer:</strong> {ans.studentAnswer}</p>
              <p><strong>Correct Answer:</strong> {ans.correctAnswer}</p>
              <p style={{ color: ans.isCorrect ? "green" : "red" }}>
                {ans.isCorrect ? "Correct" : "Incorrect"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentResults;
