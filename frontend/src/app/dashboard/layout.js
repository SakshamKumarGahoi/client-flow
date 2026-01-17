// src/app/dashboard/layout.js
"use client";

import "@/styles/dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2 className="logo">ClientFlow</h2>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/clients">Clients</a>
          <a href="/projects">Projects</a>
          <a href="/invoices">Invoices</a>
          <a href="/analytics">Analytics</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <span>Dashboard</span>
          <div className="user-avatar">👤</div>
        </header>

        <section className="dashboard-content">{children}</section>
      </main>
    </div>
  );
}
