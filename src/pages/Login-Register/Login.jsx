import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      alert("Please fill out login information");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Sign in request failed", response);

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        // Save JWT to localStorage or cookies
        localStorage.setItem("jwt", data.jwt);
        // Navigate to the main page or dashboard
        navigate("/");
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred during login");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-formContainer">
        <div>
          <div className="title-logo">
            <h1 className="title">Shopmart</h1>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <h1>
              <strong>Sign In</strong>
            </h1>
            <input
              required
              type="email"
              ref={emailRef}
              placeholder="Email"
              className="register-input"
            />
            <input
              required
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className="register-input"
            />
            <button
              className="register-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}{" "}
              {/* Prevents the button from being spam clicked */}
            </button>
          </form>
          {message && <p className="error-message">{message}</p>}
          <p className="register-login-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;


