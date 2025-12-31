import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <Link to="/" className="brand">QuizApp</Link>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/">Quizzes</Link>
        </div>
      </div>

      {user ? (
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{color:'var(--muted)'}}>{user.name} ({user.role})</span>
          <button className="btn ghost" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn primary">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
