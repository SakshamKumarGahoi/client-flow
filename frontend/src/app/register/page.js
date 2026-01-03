"use client";
import { useRedirectIfAuthenticated } from "@/lib/redirectifAuth";
import api from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
useRedirectIfAuthenticated();

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.register({ email, password });
      router.push("/dashboard");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Register</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
}

"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        {/* register form */}

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

