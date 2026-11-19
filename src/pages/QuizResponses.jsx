import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  IconArrowLeft,
  IconUsers,
  IconBarChart,
  IconTrophy,
  IconSearch,
  IconCheckCircle,
  IconXCircle,
  IconClock,
  IconCopy,
  IconCheck,
} from "../components/Icons";

const QuizResponses = () => {
  const { quizId } = useParams();
  const [responses, setResponses] = useState([]);
  const [quizInfo, setQuizInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedResponseId, setExpandedResponseId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        // Load responses
        const res = await API.get(`/responses/quiz/${quizId}`);
        const loadedResponses = res.data?.data?.responses || [];
        setResponses(loadedResponses);

        // If populated, set quiz info
        if (loadedResponses.length > 0 && loadedResponses[0].quizId) {
          setQuizInfo(loadedResponses[0].quizId);
        } else {
          // Alternatively fetch quiz details
          try {
            const qRes = await API.get(`/quiz/${quizId}`);
            setQuizInfo(qRes.data.quiz);
          } catch (e) {
            // Non-blocking
          }
        }
      } catch (error) {
        console.error(error);
        setErrorMsg("Failed to load submissions for this quiz.");
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [quizId]);

  const toggleExpand = (id) => {
    setExpandedResponseId(expandedResponseId === id ? null : id);
  };

  const filteredResponses = responses.filter((r) => {
    const nameMatch = r.studentName?.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = r.studentEmail?.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || emailMatch;
  });

  // Analytics Calculations
  const totalSubmissions = responses.length;
  const averagePercentage =
    totalSubmissions > 0
      ? Math.round(responses.reduce((sum, r) => sum + (r.percentage || 0), 0) / totalSubmissions)
      : 0;

  const highestScore =
    totalSubmissions > 0
      ? Math.max(...responses.map((r) => r.percentage || 0))
      : 0;

  const lowestScore =
    totalSubmissions > 0
      ? Math.min(...responses.map((r) => r.percentage || 0))
      : 0;

  const getBadgeClass = (percentage) => {
    if (percentage >= 80) return "badge-success";
    if (percentage >= 50) return "badge-warning";
    return "badge-danger";
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <div className="container" style={{ paddingTop: "36px" }}>
          {/* Top Breadcrumb */}
          <div style={{ marginBottom: "20px" }}>
            <Link
              to="/teacher"
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
              <span>Back to Teacher Dashboard</span>
            </Link>
          </div>

          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span className="badge badge-secondary">Assessment Analytics</span>
              </div>
              <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-main)" }}>
                {quizInfo?.title || "Quiz Responses & Results"}
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                Review individual student grades, answer accuracy, and collective performance metrics.
              </p>
            </div>
          </div>

          {/* Metrics Overview Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "36px",
            }}
          >
            <div className="card stat-card">
              <div>
                <div className="stat-title">Total Submissions</div>
                <div className="stat-value">{totalSubmissions}</div>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Completed student tests
                </span>
              </div>
              <div
                className="stat-icon"
                style={{ background: "var(--primary-light)", color: "var(--primary)" }}
              >
                <IconUsers size={22} />
              </div>
            </div>

            <div className="card stat-card">
              <div>
                <div className="stat-title">Average Score</div>
                <div className="stat-value" style={{ color: averagePercentage >= 70 ? "var(--success-text)" : "var(--primary)" }}>
                  {totalSubmissions > 0 ? `${averagePercentage}%` : "—"}
                </div>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Overall class mastery
                </span>
              </div>
              <div
                className="stat-icon"
                style={{ background: "var(--secondary-light)", color: "var(--secondary)" }}
              >
                <IconBarChart size={22} />
              </div>
            </div>

            <div className="card stat-card">
              <div>
                <div className="stat-title">Highest Score</div>
                <div className="stat-value" style={{ color: "var(--success-text)" }}>
                  {totalSubmissions > 0 ? `${highestScore}%` : "—"}
                </div>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Top student performance
                </span>
              </div>
              <div
                className="stat-icon"
                style={{ background: "var(--success-light)", color: "var(--success)" }}
              >
                <IconTrophy size={22} />
              </div>
            </div>

            <div className="card stat-card">
              <div>
                <div className="stat-title">Lowest Score</div>
                <div className="stat-value" style={{ color: lowestScore < 50 ? "var(--danger-text)" : "var(--text-main)" }}>
                  {totalSubmissions > 0 ? `${lowestScore}%` : "—"}
                </div>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Opportunity for review
                </span>
              </div>
              <div
                className="stat-icon"
                style={{ background: "var(--warning-light)", color: "var(--warning-text)" }}
              >
                <IconBarChart size={22} />
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="alert alert-error">
              <div>{errorMsg}</div>
            </div>
          )}

          {/* Search bar & List Title */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Student Submissions</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                Showing {filteredResponses.length} of {totalSubmissions} submissions
              </p>
            </div>

            {totalSubmissions > 0 && (
              <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search by student name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: "36px" }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    pointerEvents: "none",
                    display: "flex",
                  }}
                >
                  <IconSearch size={16} />
                </div>
              </div>
            )}
          </div>

          {/* Submissions Content */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: "16px", color: "var(--text-muted)" }}>Loading responses...</div>
            </div>
          ) : totalSubmissions === 0 ? (
            <div
              className="card"
              style={{
                textAlign: "center",
                padding: "60px 24px",
                borderStyle: "dashed",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--primary-light)",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px auto",
                }}
              >
                <IconUsers size={28} />
              </div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>No submissions yet</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "420px", margin: "0 auto 24px auto" }}>
                Students haven't attempted this quiz yet. Once students take this quiz from their portal, their scores and answer breakdowns will appear here automatically.
              </p>
              <Link to="/teacher" className="btn btn-outline">
                Back to Dashboard
              </Link>
            </div>
          ) : filteredResponses.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>No students match your search.</p>
              <button onClick={() => setSearchQuery("")} className="btn btn-outline btn-sm">
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {filteredResponses.map((res) => {
                const isExpanded = expandedResponseId === res._id;

                return (
                  <div key={res._id} className="card" style={{ padding: "20px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: "50%",
                            background: "var(--surface-alt)",
                            border: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "15px",
                            fontWeight: "700",
                            color: "var(--primary)",
                          }}
                        >
                          {res.studentName?.charAt(0).toUpperCase() || "S"}
                        </div>

                        <div>
                          <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "2px" }}>
                            {res.studentName}
                          </h3>
                          <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                            {res.studentEmail}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                        <div style={{ textAlign: "right" }}>
                          <span className={`badge ${getBadgeClass(res.percentage)}`} style={{ fontSize: "13px" }}>
                            {res.score} / {res.totalQuestions} ({res.percentage}%)
                          </span>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "var(--text-muted)",
                              marginTop: "4px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              justifyContent: "flex-end",
                            }}
                          >
                            <IconClock size={12} />
                            <span>{new Date(res.submittedAt).toLocaleDateString()} {new Date(res.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleExpand(res._id)}
                          className="btn btn-outline btn-sm"
                        >
                          <span>{isExpanded ? "Hide Answers" : "Inspect Answers"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Question-by-Question Breakdown */}
                    {isExpanded && (
                      <div
                        style={{
                          marginTop: "20px",
                          paddingTop: "20px",
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "14px", color: "var(--text-secondary)" }}>
                          Detailed Answer Breakdown
                        </h4>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          {res.answers?.map((ans, idx) => (
                            <div
                              key={idx}
                              style={{
                                padding: "14px 16px",
                                borderRadius: "var(--radius-md)",
                                background: ans.isCorrect ? "var(--success-light)" : "var(--danger-light)",
                                border: ans.isCorrect ? "1px solid #A7F3D0" : "1px solid #FECACA",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "flex-start",
                                  gap: "10px",
                                  marginBottom: "8px",
                                }}
                              >
                                <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>
                                  {idx + 1}. {ans.question}
                                </span>
                                <span
                                  className={`badge ${ans.isCorrect ? "badge-success" : "badge-danger"}`}
                                  style={{ whiteSpace: "nowrap" }}
                                >
                                  {ans.isCorrect ? (
                                    <>
                                      <IconCheckCircle size={13} /> Correct (+1)
                                    </>
                                  ) : (
                                    <>
                                      <IconXCircle size={13} /> Incorrect (0)
                                    </>
                                  )}
                                </span>
                              </div>

                              <div style={{ display: "flex", gap: "24px", fontSize: "13px", flexWrap: "wrap" }}>
                                <div>
                                  <span style={{ color: "var(--text-muted)" }}>Student's Answer: </span>
                                  <strong style={{ color: ans.isCorrect ? "var(--success-text)" : "var(--danger-text)" }}>
                                    {ans.studentAnswer || "(Unanswered)"}
                                  </strong>
                                </div>
                                {!ans.isCorrect && (
                                  <div>
                                    <span style={{ color: "var(--text-muted)" }}>Correct Answer: </span>
                                    <strong style={{ color: "var(--success-text)" }}>{ans.correctAnswer}</strong>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QuizResponses;
