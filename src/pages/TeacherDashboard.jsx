import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const TeacherDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get("/quiz");
        setQuizzes(res.data.quizzes || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Teacher Dashboard</h2>
        <Link to="/create-quiz">Create Quiz</Link>
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz._id}>
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <Link to={`/quiz-responses/${quiz._id}`}>View Responses</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;
