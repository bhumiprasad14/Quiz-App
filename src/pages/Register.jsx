import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      login({ ...res.data, email: form.email });
      navigate(res.data.user.role === "teacher" ? "/teacher" : "/student");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="card form-card">
        <h2 style={{marginTop:0}}>Create an account</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

          <label>Email</label>
          <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />

          <label>Password</label>
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />

          <label>Role</label>
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <div className="actions">
            <button type="submit" className="btn primary">Register</button>
            <button type="button" className="btn" onClick={() => navigate('/login')}>Have an account?</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
