import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>QuizApp</h1>
      <p>Welcome to the Quiz App. Please register or login.</p>
      <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
    </div>
  );
};

export default LandingPage;
