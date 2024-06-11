import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../store/user-store.js";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useUserStore(); // use the login function from the store

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      alert("Please fill out login information");
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate("/");
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
              {loading ? "Signing in..." : "Sign in"}
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
