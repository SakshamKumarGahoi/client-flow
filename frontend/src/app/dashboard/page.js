"use client";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">Clients<br /><strong>12</strong></div>
        <div className="stat-card">Projects<br /><strong>7</strong></div>
        <div className="stat-card">Invoices<br /><strong>₹45,000</strong></div>
      </div>
    </div>
  );
}
