"use client";

import { api } from "@/lib/api";
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
