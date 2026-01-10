"use client";

import Link from "next/link";



export default function RegisterPage() {
  return (
    <div className="auth-wrapper">
      <div className="login-card">
        <h1 className="font-recoleta text-3xl mb-2">
          Create your account
        </h1>

        <p className="text-sm mb-6 opacity-80">
          Get started in under a minute
        </p>

        {/* Google */}
        <button
          type="button"
          className="google-btn w-full mb-4 border bg-white py-2 rounded"
        >
          Sign up with Google
        </button>

        <div className="divider">
          — or sign up with email —
        </div>

        <input
          placeholder="Full name"
          className="w-full mb-3 p-2 rounded border"
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-2 rounded border"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded border"
        />

        <button className="login-btn w-full py-2 rounded">
          Create account
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="accent-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
