import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  IconBookOpen,
  IconClock,
  IconArrowRight,
  IconSearch,
  IconTrophy,
  IconSparkles,
} from "../components/Icons";

const StudentDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const res = await API.get("/quiz");
        setQuizzes(res.data.quizzes || []);
      } catch (err) {
        console.error("Failed to fetch quizzes", err);
        setErrorMsg("Failed to load available quizzes. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((q) => {
    const titleMatch = q.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = q.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || descMatch;
  });

  return (
      <div className="app-container">
        <Navbar />

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
                  <span className="badge badge-primary">Student Portal</span>
                </div>
                <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-main)" }}>
                  Hello, {user?.name || "Student"}!
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                  Explore active assessments, test your understanding, and receive instant grading.
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
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
                  <div className="stat-title">Available Quizzes</div>
                  <div className="stat-value">{quizzes.length}</div>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    Ready to take now
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
                  <div className="stat-title">Evaluation Speed</div>
                  <div className="stat-value" style={{ fontSize: "22px", color: "var(--primary)", marginTop: "4px" }}>
                    Instant
                  </div>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    Immediate score & review
                  </span>
                </div>
                <div
                  className="stat-icon"
                  style={{ background: "var(--secondary-light)", color: "var(--secondary)" }}
                >
                  <IconSparkles size={22} />
                </div>
              </div>

              <div className="card stat-card">
                <div>
                  <div className="stat-title">Learning Mode</div>
                  <div className="stat-value" style={{ fontSize: "22px", color: "var(--success-text)", marginTop: "4px" }}>
                    Self-Paced
                  </div>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    Take at your own speed
                  </span>
                </div>
                <div
                  className="stat-icon"
                  style={{ background: "var(--success-light)", color: "var(--success)" }}
                >
                  <IconTrophy size={22} />
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
                <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Available Assessments</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                  Select a quiz below to begin testing your knowledge
                </p>
              </div>

              <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search quizzes..."
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

            {/* Quiz Cards */}
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: "16px", color: "var(--text-muted)" }}>Loading assessments...</div>
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
                  {searchQuery ? "No matching quizzes found" : "No quizzes available right now"}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "400px", margin: "0 auto 24px auto" }}>
                  {searchQuery
                    ? "Try searching with a different term."
                    : "Your instructors haven't published any quizzes yet. Please check back later!"}
                </p>
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="btn btn-outline">
                    Clear Search
                  </button>
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
                {filteredQuizzes.map((quiz) => {
                  const questionCount = quiz.questions?.length || 0;
                  const estimatedMinutes = Math.max(1, questionCount * 2);

                  return (
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
                            {questionCount} Qs
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
                            justifyContent: "space-between",
                            fontSize: "12px",
                            color: "var(--text-muted)",
                            marginBottom: "18px",
                            paddingTop: "12px",
                            borderTop: "1px solid var(--border-subtle)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <IconClock size={14} />
                            <span>Est. {estimatedMinutes} min</span>
                          </div>
                          <span className="badge badge-neutral">Multiple Choice</span>
                        </div>

                        <Link
                          to={`/attempt-quiz/${quiz._id}`}
                          className="btn btn-primary"
                          style={{ width: "100%", padding: "10px" }}
                        >
                          <span>Attempt Quiz</span>
                          <IconArrowRight size={16} />
                        </Link>
                      </div>
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

      export default StudentDashboard;
