"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .getUsers()
      .then(setUsers)
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}


import { logout } from "@/lib/auth";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* dashboard content */}
    </div>
  );
}
