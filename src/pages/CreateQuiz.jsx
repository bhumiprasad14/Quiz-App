import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  IconArrowLeft,
  IconPlus,
  IconTrash,
  IconCheckCircle,
  IconBookOpen,
} from "../components/Icons";

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [
      { question: "", options: ["", "", "", ""], answer: "" },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleQuestionTextChange = (qIndex, text) => {
    const updated = [...quiz.questions];
    updated[qIndex].question = text;
    setQuiz({ ...quiz, questions: updated });
  };

  const handleOptionChange = (qIndex, oIndex, val) => {
    const updated = [...quiz.questions];
    const oldVal = updated[qIndex].options[oIndex];
    updated[qIndex].options[oIndex] = val;
    // If the edited option was the chosen answer, update the answer field as well
    if (updated[qIndex].answer === oldVal && oldVal !== "") {
      updated[qIndex].answer = val;
    }
    setQuiz({ ...quiz, questions: updated });
  };

  const handleSelectAnswer = (qIndex, chosenOptionValue) => {
    const updated = [...quiz.questions];
    updated[qIndex].answer = chosenOptionValue;
    setQuiz({ ...quiz, questions: updated });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: "", options: ["", "", "", ""], answer: "" },
      ],
    });
  };

  const removeQuestion = (qIndex) => {
    if (quiz.questions.length <= 1) return;
    const updated = quiz.questions.filter((_, idx) => idx !== qIndex);
    setQuiz({ ...quiz, questions: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Client-side validations
    if (!quiz.title.trim()) {
      setErrorMsg("Please provide a quiz title.");
      return;
    }

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      if (!q.question.trim()) {
        setErrorMsg(`Question ${i + 1} text cannot be empty.`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          setErrorMsg(`Question ${i + 1}, Option ${j + 1} cannot be empty.`);
          return;
        }
      }
      if (!q.answer.trim()) {
        setErrorMsg(`Please select or designate the correct answer for Question ${i + 1}.`);
        return;
      }
      if (!q.options.includes(q.answer.trim())) {
        setErrorMsg(`Correct answer for Question ${i + 1} must match one of the four options.`);
        return;
      }
    }

    setLoading(true);
    try {
      await API.post("/quiz", quiz);
      navigate("/teacher");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || error.response?.data?.error || "Failed to create quiz.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <div className="container-narrow" style={{ paddingTop: "36px" }}>
          {/* Top Navigation */}
          <div style={{ marginBottom: "24px" }}>
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

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-main)" }}>
                Create New Quiz
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                Add your questions, define four multiple-choice options, and select the correct answer.
              </p>
            </div>
            <span className="badge badge-primary">
              {quiz.questions.length} Question{quiz.questions.length > 1 ? "s" : ""}
            </span>
          </div>

          {errorMsg && (
            <div className="alert alert-error">
              <div>{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Quiz General Info Card */}
            <div className="card" style={{ padding: "28px", marginBottom: "28px" }}>
              <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>Quiz Details</h2>

              <div className="form-group">
                <label className="form-label" htmlFor="title">
                  Quiz Title <span style={{ color: "var(--danger)" }}>*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  className="form-input"
                  placeholder="e.g. JavaScript Fundamentals & ES6"
                  value={quiz.title}
                  onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="description">
                  Description <span className="form-label-hint">(optional)</span>
                </label>
                <textarea
                  id="description"
                  className="form-textarea"
                  placeholder="Provide instructions, topics covered, or expectations for students..."
                  value={quiz.description}
                  onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                />
              </div>
            </div>

            {/* Questions List */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h2 style={{ fontSize: "20px" }}>Questions</h2>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="btn btn-outline btn-sm"
                >
                  <IconPlus size={16} />
                  <span>Add Question</span>
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {quiz.questions.map((q, qIndex) => (
                  <div key={qIndex} className="card" style={{ padding: "24px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px",
                        paddingBottom: "12px",
                        borderBottom: "1px solid var(--border-subtle)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span className="badge badge-secondary">Question {qIndex + 1}</span>
                      </div>

                      {quiz.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIndex)}
                          className="btn btn-danger btn-sm"
                          title="Remove this question"
                        >
                          <IconTrash size={14} />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Question Statement <span style={{ color: "var(--danger)" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder={`Enter question ${qIndex + 1}...`}
                        value={q.question}
                        onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">
                        Options & Correct Answer
                        <span className="form-label-hint">
                          (Click the radio button to designate the correct answer)
                        </span>
                      </label>

                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {q.options.map((opt, oIndex) => {
                          const isSelectedAnswer = q.answer !== "" && q.answer === opt;

                          return (
                            <div
                              key={oIndex}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                background: isSelectedAnswer ? "var(--success-light)" : "var(--surface)",
                                padding: "8px 12px",
                                borderRadius: "var(--radius-md)",
                                border: isSelectedAnswer
                                  ? "1.5px solid var(--success)"
                                  : "1px solid var(--border)",
                                transition: "all var(--transition-fast)",
                              }}
                            >
                              <input
                                type="radio"
                                name={`correct-answer-${qIndex}`}
                                checked={isSelectedAnswer}
                                onChange={() => handleSelectAnswer(qIndex, opt)}
                                disabled={!opt.trim()}
                                style={{ width: "auto", margin: 0, cursor: "pointer" }}
                                title="Set as correct answer"
                              />

                              <span
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "700",
                                  color: "var(--text-muted)",
                                  minWidth: "20px",
                                }}
                              >
                                {String.fromCharCode(65 + oIndex)}.
                              </span>

                              <input
                                type="text"
                                className="form-input"
                                placeholder={`Option ${oIndex + 1}`}
                                value={opt}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                style={{
                                  marginBottom: 0,
                                  background: "white",
                                  border: isSelectedAnswer ? "1px solid #A7F3D0" : "1px solid var(--border)",
                                }}
                                required
                              />

                              {isSelectedAnswer && (
                                <span
                                  className="badge badge-success"
                                  style={{ whiteSpace: "nowrap", flexShrink: 0 }}
                                >
                                  <IconCheckCircle size={14} /> Correct
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Question Button */}
              <button
                type="button"
                onClick={addQuestion}
                className="btn btn-outline"
                style={{ width: "100%", marginTop: "16px", padding: "14px" }}
              >
                <IconPlus size={18} />
                <span>Add Another Question</span>
              </button>
            </div>

            {/* Submit Action Bar */}
            <div
              className="card"
              style={{
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <Link to="/teacher" className="btn btn-ghost">
                Cancel
              </Link>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <span>Publishing Quiz...</span>
                ) : (
                  <>
                    <IconBookOpen size={18} />
                    <span>Publish Quiz</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateQuiz;
