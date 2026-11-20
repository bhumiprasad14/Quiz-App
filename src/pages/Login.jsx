import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import { IconLogo, IconArrowRight, IconEye, IconEyeOff, IconSparkles } from "../components/Icons";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      login({ ...res.data, email: form.email });
      const userRole = res.data?.user?.role;
      navigate(userRole === "teacher" ? "/teacher" : "/student");
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data?.error || "Login failed. Please check your credentials.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "32px 16px"
    }}>
      <div style={{ width: "100%", maxWidth: "440px", margin: "0 auto" }}>
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div className="brand-logo-icon" style={{ width: 40, height: 40 }}>
              <IconLogo size={22} />
            </div>
            <span style={{ fontSize: "22px", fontWeight: "800", color: "var(--primary)" }}>Quizzie</span>
          </Link>
          <h1 style={{ fontSize: "26px", fontWeight: "800", color: "var(--text-main)", marginBottom: "8px" }}>Welcome back</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Enter your credentials to access your quiz portal
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
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <input
                id="email"
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label className="form-label" htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  style={{ paddingRight: "40px" }}
                  autoComplete="current-password"
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
                    alignItems: "center"
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
              style={{ width: "100%", padding: "12px", marginTop: "8px" }}
              disabled={loading}
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <IconArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div style={{
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid var(--border)",
            textAlign: "center",
            fontSize: "14px",
            color: "var(--text-secondary)"
          }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ fontWeight: "600", color: "var(--primary)" }}>
              Create an account
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

export default Login;
