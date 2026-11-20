import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  IconArrowLeft,
  IconTrophy,
  IconCheckCircle,
  IconXCircle,
  IconArrowRight,
  IconSparkles,
} from "../components/Icons";

const StudentResults = () => {
  const { responseId } = useParams();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/responses/${responseId}`);
        setResponse(res.data?.data?.response);
      } catch (error) {
        console.error(error);
        setErrorMsg("Failed to load your results. Please return to the dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchResponse();
  }, [responseId]);

  if (loading) {
    return (
      <div className="app-container">
        <Navbar />
        <main className="main-content" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: "18px", color: "var(--text-muted)", fontWeight: "600" }}>Calculating your score...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!response) {
    return (
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <div className="container-narrow" style={{ paddingTop: "60px", textAlign: "center" }}>
            <div className="card" style={{ padding: "40px" }}>
              <h2 style={{ marginBottom: "12px" }}>Results Not Found</h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                {errorMsg || "We could not find the score details for this submission."}
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

  const { score, totalQuestions, percentage, answers, quizId } = response;
  const incorrectCount = totalQuestions - score;

  const getEvaluation = (pct) => {
    if (pct >= 90) return { title: "Outstanding Performance!", sub: "You have thoroughly mastered this topic.", badge: "badge-success" };
    if (pct >= 70) return { title: "Great Job!", sub: "Solid understanding across most questions.", badge: "badge-primary" };
    if (pct >= 50) return { title: "Good Effort!", sub: "You passed, but reviewing the missed questions will help reinforce your knowledge.", badge: "badge-warning" };
    return { title: "Keep Practicing!", sub: "Review the correct answers below to build your confidence and mastery.", badge: "badge-danger" };
  };

  const evalInfo = getEvaluation(percentage);

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <div className="container-narrow" style={{ paddingTop: "36px" }}>
          {/* Top Breadcrumb */}
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

          {/* Celebration / Score Banner Card */}
          <div
            className="card"
            style={{
              padding: "40px 32px",
              textAlign: "center",
              marginBottom: "36px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                background: percentage >= 70 ? "var(--success-light)" : "var(--primary-light)",
                color: percentage >= 70 ? "var(--success)" : "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
              }}
            >
              <IconTrophy size={34} />
            </div>

            <div style={{ marginBottom: "8px" }}>
              <span className={`badge ${evalInfo.badge}`} style={{ fontSize: "13px" }}>
                {evalInfo.title}
              </span>
            </div>

            <h1 style={{ fontSize: "48px", fontWeight: "800", color: "var(--text-main)", marginBottom: "4px" }}>
              {percentage}%
            </h1>

            <p style={{ fontSize: "16px", color: "var(--text-secondary)", marginBottom: "24px" }}>
              You answered <strong>{score}</strong> out of <strong>{totalQuestions}</strong> questions correctly in{" "}
              <em>{quizId?.title || "this quiz"}</em>.
            </p>

            {/* Quick stats pills */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  padding: "10px 18px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--success-light)",
                  border: "1px solid #A7F3D0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "var(--success-text)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <IconCheckCircle size={16} />
                <span>{score} Correct</span>
              </div>

              <div
                style={{
                  padding: "10px 18px",
                  borderRadius: "var(--radius-md)",
                  background: incorrectCount === 0 ? "var(--surface-alt)" : "var(--danger-light)",
                  border: incorrectCount === 0 ? "1px solid var(--border)" : "1px solid #FECACA",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: incorrectCount === 0 ? "var(--text-muted)" : "var(--danger-text)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <IconXCircle size={16} />
                <span>{incorrectCount} Incorrect</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <Link to="/student" className="btn btn-primary btn-lg">
                <span>Browse More Quizzes</span>
                <IconArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "8px" }}>
              Detailed Question Review
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "20px" }}>
              Examine each question along with your submission and the correct answer.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {answers?.map((ans, index) => (
                <div
                  key={index}
                  className="card"
                  style={{
                    padding: "24px",
                    borderLeft: ans.isCorrect
                      ? "4px solid var(--success)"
                      : "4px solid var(--danger)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "14px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="badge badge-neutral">Question {index + 1}</span>
                    </div>

                    <span
                      className={`badge ${ans.isCorrect ? "badge-success" : "badge-danger"}`}
                      style={{ fontSize: "12px" }}
                    >
                      {ans.isCorrect ? (
                        <>
                          <IconCheckCircle size={14} /> Correct
                        </>
                      ) : (
                        <>
                          <IconXCircle size={14} /> Incorrect
                        </>
                      )}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "var(--text-main)",
                      marginBottom: "16px",
                      lineHeight: "1.4",
                    }}
                  >
                    {ans.question}
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: "var(--radius-sm)",
                        background: ans.isCorrect ? "var(--success-light)" : "var(--danger-light)",
                        border: ans.isCorrect ? "1px solid #A7F3D0" : "1px solid #FECACA",
                      }}
                    >
                      <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase" }}>
                        Your Answer
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: ans.isCorrect ? "var(--success-text)" : "var(--danger-text)",
                          marginTop: "2px",
                        }}
                      >
                        {ans.studentAnswer || "(No answer selected)"}
                      </div>
                    </div>

                    {!ans.isCorrect && (
                      <div
                        style={{
                          padding: "12px 14px",
                          borderRadius: "var(--radius-sm)",
                          background: "var(--success-light)",
                          border: "1px solid #A7F3D0",
                        }}
                      >
                        <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase" }}>
                          Correct Answer
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "var(--success-text)",
                            marginTop: "2px",
                          }}
                        >
                          {ans.correctAnswer}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentResults;
