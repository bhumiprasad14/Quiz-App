import React from "react";
import { Link } from "react-router-dom";
import { IconLogo, IconSparkles } from "./Icons";

const Footer = () => {
  return (
    <footer style={{
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      padding: "48px 0 32px 0",
      marginTop: "auto"
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "36px",
          marginBottom: "40px"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div className="brand-logo-icon" style={{ width: 32, height: 32 }}>
                <IconLogo size={18} />
              </div>
              <span style={{ fontSize: "18px", fontWeight: "800", color: "var(--primary)" }}>Quizzie</span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6", maxWidth: "280px" }}>
              The modern interactive quiz and assessment platform built for educators, students, and lifelong learners.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "16px" }}>Product</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
              <Link to="/#features" style={{ color: "var(--text-secondary)" }}>Features</Link>
              <Link to="/#how-it-works" style={{ color: "var(--text-secondary)" }}>How It Works</Link>
              <Link to="/login" style={{ color: "var(--text-secondary)" }}>Sign In</Link>
              <Link to="/register" style={{ color: "var(--text-secondary)" }}>Get Started</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "16px" }}>Portals</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
              <Link to="/teacher" style={{ color: "var(--text-secondary)" }}>Teacher Dashboard</Link>
              <Link to="/student" style={{ color: "var(--text-secondary)" }}>Student Portal</Link>
              <Link to="/register" style={{ color: "var(--text-secondary)" }}>Educator Signup</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "16px" }}>Platform Status</h4>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              background: "var(--success-light)",
              borderRadius: "var(--radius-full)",
              fontSize: "13px",
              color: "var(--success-text)",
              fontWeight: "600",
              marginBottom: "12px"
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)" }} />
              API Services Active
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Engineered with modern React & Express stack.
            </p>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          fontSize: "13px",
          color: "var(--text-muted)"
        }}>
          <div>
            &copy; {new Date().getFullYear()} Quizzie. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
