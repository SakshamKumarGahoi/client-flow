"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="font-recoleta text-3xl mb-2">
          Welcome back
        </h1>

        <p className="text-sm mb-6 opacity-80">
          Sign in to continue
        </p>

        <button className="google-btn">
          Continue with Google
        </button>

        <div className="divider">
          — or continue with email —
        </div>

        <input placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button className="login-btn">
          Login
        </button>

        <p className="switch-auth">
          Don’t have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
