import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const StudentDashboard = () => {
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
        <h2>Student Dashboard</h2>
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz._id}>
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <Link to={`/attempt-quiz/${quiz._id}`}>Attempt Quiz</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
