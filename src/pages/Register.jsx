import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import {
  IconLogo,
  IconArrowRight,
  IconEye,
  IconEyeOff,
  IconUser,
  IconSchool,
  IconCheck,
} from "../components/Icons";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await API.post("/auth/register", form);
      login({ ...res.data, email: form.email });
      const targetRole = res.data?.user?.role || form.role;
      navigate(targetRole === "teacher" ? "/teacher" : "/student");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please verify your details.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "36px 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "480px", margin: "0 auto" }}>
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div className="brand-logo-icon" style={{ width: 40, height: 40 }}>
              <IconLogo size={22} />
            </div>
            <span style={{ fontSize: "22px", fontWeight: "800", color: "var(--primary)" }}>
              Quizzie
            </span>
          </Link>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "800",
              color: "var(--text-main)",
              marginBottom: "8px",
            }}
          >
            Create an account
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Start learning or assessing with modern interactive quizzes
          </p>
        </div>

        {/* Form Card */}
        <div className="card" style={{ padding: "36px 32px" }}>
          {errorMsg && (
            <div className="alert alert-error">
              <div>{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Role Selection Tabs */}
            <div className="form-group">
              <label className="form-label">I want to join as</label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div
                  onClick={() => setForm({ ...form, role: "student" })}
                  style={{
                    padding: "14px",
                    borderRadius: "var(--radius-md)",
                    border:
                      form.role === "student"
                        ? "2px solid var(--primary)"
                        : "1px solid var(--border)",
                    background:
                      form.role === "student"
                        ? "var(--primary-light)"
                        : "var(--surface)",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background:
                        form.role === "student"
                          ? "var(--primary)"
                          : "var(--surface-alt)",
                      color:
                        form.role === "student"
                          ? "white"
                          : "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconUser size={18} />
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color:
                        form.role === "student"
                          ? "var(--primary)"
                          : "var(--text-main)",
                    }}
                  >
                    Student
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    Take quizzes & learn
                  </span>
                </div>

                <div
                  onClick={() => setForm({ ...form, role: "teacher" })}
                  style={{
                    padding: "14px",
                    borderRadius: "var(--radius-md)",
                    border:
                      form.role === "teacher"
                        ? "2px solid var(--secondary)"
                        : "1px solid var(--border)",
                    background:
                      form.role === "teacher"
                        ? "var(--secondary-light)"
                        : "var(--surface)",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background:
                        form.role === "teacher"
                          ? "var(--secondary)"
                          : "var(--surface-alt)",
                      color:
                        form.role === "teacher"
                          ? "white"
                          : "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconSchool size={18} />
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color:
                        form.role === "teacher"
                          ? "var(--secondary)"
                          : "var(--text-main)",
                    }}
                  >
                    Teacher
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    Create & grade quizzes
                  </span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="e.g. Alex Johnson"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">
                Email Address
              </label>
              <input
                id="reg-email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  style={{ paddingRight: "40px" }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                  }}
                  tabIndex={-1}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px", marginTop: "10px" }}
              disabled={loading}
            >
              {loading ? (
                <span>Creating account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <IconArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div
            style={{
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border)",
              textAlign: "center",
              fontSize: "14px",
              color: "var(--text-secondary)",
            }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ fontWeight: "600", color: "var(--primary)" }}>
              Sign In
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link to="/" style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
