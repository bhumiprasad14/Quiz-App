import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { IconLogo, IconLogOut, IconUser, IconPlus, IconMenu, IconX } from "./Icons";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const dashboardPath = user?.role === "teacher" ? "/teacher" : "/student";

  return (
    <header className="header-nav">
      <div className="nav-wrapper">
        <Link to="/" className="brand-link">
          <div className="brand-logo-icon">
            <IconLogo size={20} />
          </div>
          <span>Quizzie</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-menu">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          <a href="/#features" className="nav-link">
            Features
          </a>
          <a href="/#how-it-works" className="nav-link">
            How It Works
          </a>

          {user && (
            <Link
              to={dashboardPath}
              className={`nav-link ${location.pathname.startsWith("/teacher") || location.pathname.startsWith("/student") ? "active" : ""}`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* User / CTA Area */}
        <div className="nav-actions">
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {user.role === "teacher" && (
                <Link to="/create-quiz" className="btn btn-primary btn-sm" style={{ display: "none", mdDisplay: "inline-flex" }}>
                  <IconPlus size={16} />
                  <span>Create Quiz</span>
                </Link>
              )}

              <div className="user-profile-badge">
                <div className="user-avatar-initials">{getInitials(user.name)}</div>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{user.name}</span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "capitalize" }}>{user.role}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-outline btn-sm"
                title="Logout"
                style={{ padding: "6px 10px" }}
              >
                <IconLogOut size={16} />
                <span style={{ display: "none" }}>Logout</span>
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link to="/login" className="btn btn-ghost btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-sm"
            style={{ padding: 6, display: "inline-flex" }}
          >
            {mobileMenuOpen ? <IconX size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ color: "var(--text-main)", fontWeight: "600" }}>
            Home
          </Link>
          <a href="/#features" onClick={() => setMobileMenuOpen(false)} style={{ color: "var(--text-secondary)" }}>
            Features
          </a>
          <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ color: "var(--text-secondary)" }}>
            How It Works
          </a>

          {user && (
            <Link
              to={dashboardPath}
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "var(--primary)", fontWeight: "700" }}
            >
              My Dashboard
            </Link>
          )}

          {!user && (
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline" style={{ flex: 1 }}>
                Sign In
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ flex: 1 }}>
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
