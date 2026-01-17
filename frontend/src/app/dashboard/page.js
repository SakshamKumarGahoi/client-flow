"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <h4>Clients</h4>
        <p>{stats.clients}</p>
      </div>

      <div className="stat-card">
        <h4>Projects</h4>
        <p>{stats.projects}</p>
      </div>

      <div className="stat-card">
        <h4>Revenue</h4>
        <p>₹{stats.revenue}</p>
      </div>
    </div>
  );
}
