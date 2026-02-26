import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });
      console.log('res',res)
      localStorage.setItem("token", res.data.data);
      navigate("/");

    } catch (error) {
      alert(error.response?.data?.error);
    }
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <h2>Login</h2>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}