import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        alert("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error logging in:", error.response);
        alert(
          `Error logging in: ${error.response.data.message || "Unknown error"}`
        );
      } else {
        console.error("Error logging in:", error.message);
        alert(`Error logging in: ${error.message}`);
      }
    }
  };

  return (
    <div className="loginpage">
      <header className="login-head">
        <h1>Login</h1>
        <p>Enter your credentials to access your account</p>
      </header>
      <main className="login-main-content">
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </main>
      <footer className="footer">
        <p>&copy; 2025 Finance Manager. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
