import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  IconSparkles,
  IconArrowRight,
  IconCheckCircle,
  IconTrophy,
  IconBookOpen,
  IconBarChart,
  IconUsers,
  IconShield,
  IconSchool,
  IconClock,
} from "../components/Icons";

const LandingPage = () => {
  const { user } = useContext(AuthContext);

  const targetDashboard = user?.role === "teacher" ? "/teacher" : "/student";

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        {/* HERO SECTION */}
        <section style={{
          position: "relative",
          overflow: "hidden",
          padding: "72px 0 80px 0",
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
          borderBottom: "1px solid var(--border)"
        }}>
          {/* Subtle background glow */}
          <div style={{
            position: "absolute",
            top: "-15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(circle, rgba(67, 56, 202, 0.08) 0%, rgba(124, 58, 237, 0.03) 60%, transparent 100%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0
          }} />

          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: "var(--primary-light)",
                borderRadius: "var(--radius-full)",
                color: "var(--primary)",
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "24px"
              }}>
                <IconSparkles size={16} />
                <span>Next-Generation Quiz & Assessment Platform</span>
              </div>

              <h1 style={{
                fontSize: "clamp(36px, 5.5vw, 56px)",
                fontWeight: "800",
                color: "var(--text-main)",
                lineHeight: "1.15",
                letterSpacing: "-0.03em",
                marginBottom: "20px"
              }}>
                Learn Smarter. <span style={{
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>Challenge Yourself.</span> Grow Every Day.
              </h1>

              <p style={{
                fontSize: "clamp(16px, 2vw, 19px)",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
                marginBottom: "36px",
                maxWidth: "700px",
                margin: "0 auto 36px auto"
              }}>
                Quizzie makes learning interactive through engaging quizzes, real-time performance tracking, and a smarter way to test your knowledge.
              </p>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                flexWrap: "wrap",
                marginBottom: "48px"
              }}>
                {user ? (
                  <Link to={targetDashboard} className="btn btn-primary btn-lg">
                    <span>Go to My Dashboard</span>
                    <IconArrowRight size={18} />
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg">
                      <span>Get Started Free</span>
                      <IconArrowRight size={18} />
                    </Link>
                    <Link to="/login" className="btn btn-outline btn-lg">
                      <span>Sign In</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Trust Indicators */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "28px",
                flexWrap: "wrap",
                color: "var(--text-muted)",
                fontSize: "13px",
                fontWeight: "500"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconCheckCircle size={16} color="var(--success)" />
                  <span>Instant Grading & Scores</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconCheckCircle size={16} color="var(--success)" />
                  <span>Role-Based Teacher & Student Portals</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconCheckCircle size={16} color="var(--success)" />
                  <span>Detailed Answer Reviews</span>
                </div>
              </div>
            </div>

            {/* DASHBOARD PREVIEW CARD */}
            <div style={{
              marginTop: "56px",
              background: "var(--surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-xl)",
              overflow: "hidden"
            }}>
              {/* Window bar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 20px",
                background: "var(--surface-alt)",
                borderBottom: "1px solid var(--border)"
              }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
                </div>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "500" }}>quizzie.app/dashboard</span>
                <div style={{ width: 40 }} />
              </div>

              {/* Interactive preview showcase */}
              <div style={{ padding: "32px", background: "#FFFFFF" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "20px",
                  marginBottom: "28px"
                }}>
                  <div style={{ padding: "18px", borderRadius: "var(--radius-md)", background: "var(--surface-alt)", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600" }}>ACTIVE QUIZZES</span>
                      <IconBookOpen size={18} color="var(--primary)" />
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-main)" }}>Ready for Testing</div>
                    <span style={{ fontSize: "12px", color: "var(--success-text)", fontWeight: "600" }}>Updated Real-Time</span>
                  </div>

                  <div style={{ padding: "18px", borderRadius: "var(--radius-md)", background: "var(--surface-alt)", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600" }}>PERFORMANCE AVERAGE</span>
                      <IconBarChart size={18} color="var(--secondary)" />
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-main)" }}>92% Accuracy</div>
                    <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: "600" }}>Top Class Tier</span>
                  </div>

                  <div style={{ padding: "18px", borderRadius: "var(--radius-md)", background: "var(--surface-alt)", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600" }}>SUBMISSION FEEDBACK</span>
                      <IconTrophy size={18} color="var(--warning)" />
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-main)" }}>Instant Analysis</div>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Question-by-Question</span>
                  </div>
                </div>

                {/* Sample Mock Question UI */}
                <div style={{
                  padding: "24px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  background: "var(--surface-muted)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span className="badge badge-primary">Sample Question Preview</span>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <IconClock size={14} /> Self-Paced
                    </span>
                  </div>
                  <h3 style={{ fontSize: "16px", marginBottom: "16px" }}>Which data structure organizes items in a Last-In, First-Out (LIFO) order?</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div style={{ padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "white", border: "1px solid var(--border)", fontSize: "13px" }}>A. Queue</div>
                    <div style={{ padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "var(--success-light)", border: "1px solid var(--success)", fontSize: "13px", fontWeight: "600", color: "var(--success-text)", display: "flex", justifyContent: "space-between" }}>
                      <span>B. Stack</span>
                      <IconCheckCircle size={16} color="var(--success)" />
                    </div>
                    <div style={{ padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "white", border: "1px solid var(--border)", fontSize: "13px" }}>C. Array</div>
                    <div style={{ padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "white", border: "1px solid var(--border)", fontSize: "13px" }}>D. Linked List</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" style={{ padding: "80px 0", background: "#FFFFFF" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 56px auto" }}>
              <span className="badge badge-secondary" style={{ marginBottom: "12px" }}>Engineered for Learning</span>
              <h2 style={{ fontSize: "36px", marginBottom: "16px" }}>Everything you need for comprehensive knowledge assessment</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
                Built from the ground up to support educators in evaluating comprehension and students in testing their mastery.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "28px"
            }}>
              {/* Feature 1 */}
              <div className="card card-hover" style={{ padding: "32px" }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  background: "var(--primary-light)",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <IconBookOpen size={24} />
                </div>
                <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Interactive Quizzes</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>
                  Take structured quizzes with multiple-choice questions, intuitive single-click selection, and clear progress tracking.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card card-hover" style={{ padding: "32px" }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  background: "var(--secondary-light)",
                  color: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <IconBarChart size={24} />
                </div>
                <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Student Performance Tracking</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>
                  Real-time analytics reveal score percentages, accuracy metrics, and exact question-level breakdowns for every submission.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card card-hover" style={{ padding: "32px" }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  background: "var(--success-light)",
                  color: "var(--success-text)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <IconSchool size={24} />
                </div>
                <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Teacher Quiz Management</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>
                  Easily author custom quizzes with multiple options, designated answers, descriptions, and view all student responses in one central dashboard.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="card card-hover" style={{ padding: "32px" }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  background: "var(--warning-light)",
                  color: "var(--warning-text)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <IconTrophy size={24} />
                </div>
                <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Instant Results</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>
                  No more waiting for manual paper evaluations. Receive instantaneous scoring and feedback the second you hit submit.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="card card-hover" style={{ padding: "32px" }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  background: "var(--primary-light)",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <IconShield size={24} />
                </div>
                <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Role-Based Access</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>
                  Secure JWT-backed sessions with distinct permissions for teachers and students protect quiz contents and grade privacy.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="card card-hover" style={{ padding: "32px" }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-md)",
                  background: "var(--secondary-light)",
                  color: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <IconUsers size={24} />
                </div>
                <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Personalized Learning</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>
                  Review incorrect answers, identify knowledge gaps, and understand correct concepts to consistently elevate academic performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" style={{ padding: "80px 0", background: "var(--bg-page)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 56px auto" }}>
              <span className="badge badge-primary" style={{ marginBottom: "12px" }}>Simple 3-Step Flow</span>
              <h2 style={{ fontSize: "36px", marginBottom: "16px" }}>How Quizzie Works</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
                Designed with a streamlined workflow so you can spend less time configuring and more time learning.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px"
            }}>
              <div className="card" style={{ padding: "32px", position: "relative" }}>
                <div style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "var(--border)"
                }}>01</div>
                <h3 style={{ fontSize: "18px", marginBottom: "12px", marginTop: "12px" }}>Create an Account</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>
                  Sign up in seconds and choose your profile as a <strong>Student</strong> to test your mastery or as a <strong>Teacher</strong> to build assessments.
                </p>
              </div>

              <div className="card" style={{ padding: "32px", position: "relative" }}>
                <div style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "var(--border)"
                }}>02</div>
                <h3 style={{ fontSize: "18px", marginBottom: "12px", marginTop: "12px" }}>Publish or Take Quizzes</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>
                  Teachers build custom quizzes with multiple options and answers. Students browse available quizzes and test their knowledge at their own pace.
                </p>
              </div>

              <div className="card" style={{ padding: "32px", position: "relative" }}>
                <div style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "var(--border)"
                }}>03</div>
                <h3 style={{ fontSize: "18px", marginBottom: "12px", marginTop: "12px" }}>Instant Scores & Analytics</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>
                  Get automated grading upon submission with full question-by-question breakdowns. Teachers see student rosters and class averages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section style={{ padding: "80px 0", background: "#FFFFFF" }}>
          <div className="container">
            <div style={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
              borderRadius: "var(--radius-lg)",
              padding: "60px 40px",
              textAlign: "center",
              color: "white",
              boxShadow: "var(--shadow-xl)"
            }}>
              <h2 style={{ fontSize: "36px", color: "white", marginBottom: "16px" }}>Ready to transform the way you assess knowledge?</h2>
              <p style={{ fontSize: "17px", color: "rgba(255, 255, 255, 0.9)", maxWidth: "600px", margin: "0 auto 32px auto", lineHeight: "1.6" }}>
                Join students and educators using Quizzie for seamless assessments and automated grade reporting.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
                <Link to="/register" className="btn btn-lg" style={{ background: "white", color: "var(--primary)", fontWeight: "700" }}>
                  Create Free Account
                </Link>
                <Link to="/login" className="btn btn-lg" style={{ background: "rgba(255, 255, 255, 0.15)", color: "white", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
