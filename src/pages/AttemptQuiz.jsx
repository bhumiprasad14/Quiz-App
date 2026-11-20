import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  IconArrowLeft,
  IconCheckCircle,
  IconClock,
  IconCheck,
  IconArrowRight,
} from "../components/Icons";

const AttemptQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/quiz/${quizId}`);
        setQuiz(res.data.quiz);
      } catch (error) {
        console.error("Failed to load quiz details", error);
        setErrorMsg("Failed to load quiz details. Please return to the dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleSelectOption = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = quiz?.questions?.length || 0;
  const progressPercentage =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (answeredCount < totalQuestions) {
      const confirmSubmit = window.confirm(
        `You have answered ${answeredCount} of ${totalQuestions} questions. Are you sure you want to submit?`
      );
      if (!confirmSubmit) return;
    }

    const answersArray = Object.keys(answers).map((questionId) => ({
      questionId,
      answer: answers[questionId],
    }));

    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await API.post("/responses/submit", {
        quizId,
        studentName: user?.name || "Student",
        studentEmail: user?.email || "student@example.com",
        answers: answersArray,
      });

      const responseId =
        res.data?.data?.response?.id || res.data?.data?.response?._id;
      if (responseId) {
        navigate(`/student/results/${responseId}`);
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.error("Failed to submit quiz", error);
      const msg =
        error.response?.data?.message ||
        "Failed to submit quiz. Please try again.";
      setErrorMsg(msg);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <Navbar />
        <main
          className="main-content"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div
              style={{
                fontSize: "18px",
                color: "var(--text-muted)",
                fontWeight: "600",
              }}
            >
              Preparing quiz...
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <div
            className="container-narrow"
            style={{ paddingTop: "60px", textAlign: "center" }}
          >
            <div className="card" style={{ padding: "40px" }}>
              <h2 style={{ marginBottom: "12px" }}>Quiz Not Found</h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "24px",
                }}
              >
                The quiz you are looking for may have been removed or is unavailable.
              </p>
              <Link to="/student" className="btn btn-primary">
                Return to Dashboard
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <div className="container-narrow" style={{ paddingTop: "32px" }}>
          {/* Back breadcrumb */}
          <div style={{ marginBottom: "20px" }}>
            <Link
              to="/student"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                color: "var(--text-muted)",
                fontWeight: "500",
              }}
            >
              <IconArrowLeft size={16} />
              <span>Back to Student Portal</span>
            </Link>
          </div>

          {/* Quiz Header & Progress Card */}
          <div className="card" style={{ padding: "28px", marginBottom: "28px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              <div>
                <span className="badge badge-primary" style={{ marginBottom: "8px" }}>
                  Interactive Assessment
                </span>
                <h1 style={{ fontSize: "26px", fontWeight: "800", color: "var(--text-main)" }}>
                  {quiz.title}
                </h1>
                {quiz.description && (
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "6px" }}>
                    {quiz.description}
                  </p>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  background: "var(--surface-alt)",
                  padding: "6px 12px",
                  borderRadius: "var(--radius-full)",
                }}
              >
                <IconClock size={15} />
                <span>Self-Paced Test</span>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "var(--text-secondary)",
                }}
              >
                <span>Progress: {answeredCount} of {totalQuestions} answered</span>
                <span style={{ color: "var(--primary)" }}>{progressPercentage}% Completed</span>
              </div>
              <div
                style={{
                  height: "8px",
                  background: "var(--surface-alt)",
                  borderRadius: "var(--radius-full)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progressPercentage}%`,
                    background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
                    borderRadius: "var(--radius-full)",
                    transition: "width 300ms ease",
                  }}
                />
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="alert alert-error" style={{ marginBottom: "24px" }}>
              <div>{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Questions List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "32px" }}>
              {quiz.questions && quiz.questions.map((q, qIndex) => {
                const selectedOption = answers[q._id];

                return (
                  <div key={q._id || qIndex} className="card" style={{ padding: "28px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                      <span className="badge badge-neutral">Question {qIndex + 1}</span>
                      {selectedOption && (
                        <span className="badge badge-success" style={{ fontSize: "11px" }}>
                          <IconCheck size={12} /> Answered
                        </span>
                      )}
                    </div>

                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "var(--text-main)",
                        lineHeight: "1.4",
                        marginBottom: "20px",
                      }}
                    >
                      {q.question}
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {q.options && q.options.map((opt, oIndex) => {
                        const isChosen = selectedOption === opt;

                        return (
                          <div
                            key={oIndex}
                            onClick={() => handleSelectOption(q._id, opt)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "14px",
                              padding: "14px 18px",
                              borderRadius: "var(--radius-md)",
                              border: isChosen
                                ? "2px solid var(--primary)"
                                : "1px solid var(--border)",
                              background: isChosen
                                ? "var(--primary-light)"
                                : "var(--surface)",
                              cursor: "pointer",
                              transition: "all var(--transition-fast)",
                              boxShadow: isChosen ? "0 0 0 1px var(--primary)" : "none",
                            }}
                          >
                            <input
                              type="radio"
                              name={`question-${q._id}`}
                              value={opt}
                              checked={isChosen}
                              onChange={() => handleSelectOption(q._id, opt)}
                              style={{ width: "auto", margin: 0, cursor: "pointer" }}
                            />

                            <span
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                background: isChosen ? "var(--primary)" : "var(--surface-alt)",
                                color: isChosen ? "white" : "var(--text-muted)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                fontWeight: "700",
                                flexShrink: 0,
                              }}
                            >
                              {String.fromCharCode(65 + oIndex)}
                            </span>

                            <span
                              style={{
                                fontSize: "15px",
                                color: isChosen ? "var(--primary-hover)" : "var(--text-main)",
                                fontWeight: isChosen ? "600" : "normal",
                              }}
                            >
                              {opt}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions Bar */}
            <div
              className="card"
              style={{
                position: "sticky",
                bottom: "20px",
                zIndex: 30,
                padding: "18px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "var(--shadow-xl)",
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-secondary)" }}>
                  {answeredCount} of {totalQuestions} answered
                </span>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <Link to="/student" className="btn btn-outline">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span>Submitting Answers...</span>
                  ) : (
                    <>
                      <span>Submit Quiz</span>
                      <IconCheckCircle size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AttemptQuiz;
