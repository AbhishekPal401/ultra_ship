import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../services/auth";
import { Mail, Lock, MoreHorizontal } from "lucide-react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../store/slices/auth/login";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const [login, { data, error, isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
    } catch (err) {
      console.error("login failed (component):", err);
    }
  };

  useEffect(() => {
    if (error) {
      const msg =
        error?.message || error?.error || "Login failed. Please try again.";

      toast.error(msg);
    }
  }, [error]);

  useEffect(() => {
    if (data?.token) {
      dispatch(setCredentials(data));
    }
  }, [data]);

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="logo-box">
          <img src="logo.svg" alt="Logo" className="logo-image" />
        </div>
        <h1 className="page-title">Sign in</h1>
      </div>

      {/* Main Card */}
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="field-icon" size={18} />
            </div>
          </div>

          {/* Password Field */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                id="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="field-icon" size={18} />
            </div>
          </div>

          <button type="submit" className="continue-btn">
            {isLoading ? (
              <MoreHorizontal className="loader-icon" size={24} />
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
