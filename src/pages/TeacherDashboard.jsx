// import { useState, useEffect } from "react";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  IconPlus,
  IconBookOpen,
  IconUsers,
  IconSearch,
  IconCopy,
  IconCheck,
  IconArrowRight,
  IconBarChart,
  IconClock,
} from "../components/Icons";

const TeacherDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const res = await API.get("/quiz");
        setQuizzes(res.data.quizzes || []);
      } catch (err) {
        console.error(err);
        console.error("Failed to load quizzes", err);
        setErrorMsg("Failed to load your quizzes. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredQuizzes = quizzes.filter((q) => {
    const titleMatch = q.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = q.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || descMatch;
  });

  const totalQuestions = quizzes.reduce(
    (acc, q) => acc + (q.questions ? q.questions.length : 0),
    0
  );

  return (

    <div className="app-container">
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

      <main className="main-content">
        <div className="container" style={{ paddingTop: "36px" }}>
          {/* Header section */}
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
                <span className="badge badge-secondary">Teacher Portal</span>
              </div>
              <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-main)" }}>
                Welcome back, {user?.name || "Educator"}
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                Manage your assessments, review student submissions, and author new quizzes.
              </p>
            </div>

            <Link to="/create-quiz" className="btn btn-primary btn-lg">
              <IconPlus size={18} />
              <span>Create New Quiz</span>
            </Link>
          </div>

          {/* Stats Overview Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginBottom: "36px",
            }}
          >
            <div className="card stat-card">
              <div>
                <div className="stat-title">Quizzes Created</div>
                <div className="stat-value">{quizzes.length}</div>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Published assessments
                </span>
              </div>
              <div
                className="stat-icon"
                style={{ background: "var(--primary-light)", color: "var(--primary)" }}
              >
                <IconBookOpen size={22} />
              </div>
            </div>

            <div className="card stat-card">
              <div>
                <div className="stat-title">Total Questions</div>
                <div className="stat-value">{totalQuestions}</div>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Across all assessments
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
                <div className="stat-title">Portal Status</div>
                <div className="stat-value" style={{ fontSize: "20px", color: "var(--success-text)", marginTop: "6px" }}>
                  Active & Live
                </div>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Ready for submissions
                </span>
              </div>
              <div
                className="stat-icon"
                style={{ background: "var(--success-light)", color: "var(--success)" }}
              >
                <IconUsers size={22} />
              </div>
            </div>
          </div>

          {/* Error notification */}
          {errorMsg && (
            <div className="alert alert-error">
              <div>{errorMsg}</div>
            </div>
          )}

          {/* Search Bar & Header */}
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
              <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Your Quizzes</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                Showing {filteredQuizzes.length} of {quizzes.length} assessments
              </p>
            </div>

            <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search by title or topic..."
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
          </div>

          {/* Quizzes List or States */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: "16px", color: "var(--text-muted)" }}>Loading quizzes...</div>
            </div>
          ) : filteredQuizzes.length === 0 ? (
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
                <IconBookOpen size={28} />
              </div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>
                {searchQuery ? "No matching quizzes found" : "No quizzes created yet"}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "400px", margin: "0 auto 24px auto" }}>
                {searchQuery
                  ? "Try searching with a different term or clear the filter."
                  : "Get started by building your first quiz. Add questions with multiple options and instant automated grading."}
              </p>
              {searchQuery ? (
                <button onClick={() => setSearchQuery("")} className="btn btn-outline">
                  Clear Search
                </button>
              ) : (
                <Link to="/create-quiz" className="btn btn-primary">
                  <IconPlus size={16} />
                  <span>Create First Quiz</span>
                </Link>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="card card-hover"
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "var(--text-main)",
                          lineHeight: "1.3",
                        }}
                      >
                        {quiz.title}
                      </h3>
                      <span className="badge badge-primary" style={{ flexShrink: 0 }}>
                        {quiz.questions?.length || 0} Questions
                      </span>
                    </div>

                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        marginBottom: "20px",
                        minHeight: "42px",
                      }}
                    >
                      {quiz.description || "No description provided for this quiz."}
                    </p>
                  </div>

                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        color: "var(--text-muted)",
                        marginBottom: "18px",
                        paddingTop: "12px",
                        borderTop: "1px solid var(--border-subtle)",
                      }}
                    >
                      <IconClock size={14} />
                      <span>
                        Created: {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : "Recent"}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <Link
                        to={`/quiz-responses/${quiz._id}`}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
                      >
                        <IconUsers size={16} />
                        <span>View Responses</span>
                      </Link>

                      <button
                        onClick={() => handleCopyId(quiz._id)}
                        className="btn btn-outline btn-sm"
                        title="Copy Quiz ID"
                        style={{ padding: "6px 10px" }}
                      >
                        {copiedId === quiz._id ? (
                          <IconCheck size={16} color="var(--success)" />
                        ) : (
                          <IconCopy size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;
