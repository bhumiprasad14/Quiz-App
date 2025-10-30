import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CreateQuiz from "./pages/CreateQuiz";
import AttemptQuiz from "./pages/AttemptQuiz";
import StudentResults from "./pages/StudentResults";
import QuizResponses from "./pages/QuizResponses";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/create-quiz" element={<ProtectedRoute role="teacher"><CreateQuiz /></ProtectedRoute>} />
        <Route path="/quiz-responses/:quizId" element={<ProtectedRoute role="teacher"><QuizResponses /></ProtectedRoute>} />
        <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/attempt-quiz/:quizId" element={<ProtectedRoute role="student"><AttemptQuiz /></ProtectedRoute>} />
        <Route path="/student/results/:responseId" element={<ProtectedRoute role="student"><StudentResults /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
