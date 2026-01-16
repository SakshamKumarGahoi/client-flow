"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.register({ email, password, name, company });
      router.push("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Create account</h1>
        <p>Start managing your clients</p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
  <input
    placeholder="Full name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <input
    placeholder="Company (optional)"
    value={company}
    onChange={(e) => setCompany(e.target.value)}
  />

  <input
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  {/* PASSWORD FIELD */}
  <div className="password-field">
    <div className="password-input-wrapper">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label="Toggle password visibility"
      >
        {showPassword ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3l18 18M10.6 10.6A3 3 0 0012 15a3 3 0 002.4-4.4"
              stroke="#555"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6.5 6.5C4.6 7.8 3.2 9.8 2 12c2.5 4.5 7 7 10 7 1.1 0 2.3-.3 3.5-.9"
              stroke="#555"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12s-4 7.5-10.5 7.5S1.5 12 1.5 12z"
              stroke="#555"
              strokeWidth="2"
            />
            <circle cx="12" cy="12" r="3" stroke="#555" strokeWidth="2" />
          </svg>
        )}
      </button>
    </div>

    <ul className="password-rules">
      <li className={password.length >= 8 ? "valid" : ""}>8+ characters</li>
      <li className={/[A-Z]/.test(password) ? "valid" : ""}>
        Uppercase letter
      </li>
      <li className={/\d/.test(password) ? "valid" : ""}>Number</li>
      <li
        className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "valid" : ""}
      >
        Special character
      </li>
    </ul>
  </div>

  {/* SUBMIT BUTTON — OUTSIDE password-field */}
  <button type="submit" disabled={loading}>
    {loading ? "Creating..." : "Register"}
  </button>
</form>

        <p className="switch-auth">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
