"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">ClientFlow</div>

      <nav>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="#">Clients</Link>
        <Link href="#">Projects</Link>
        <Link href="#">Invoices</Link>
        <Link href="#">Analytics</Link>
      </nav>
    </aside>
  );
}
