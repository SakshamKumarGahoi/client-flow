"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.getClients().then(setClients);
  }, []);

  return (
    <div>
      <h1>Clients</h1>

      {clients.length === 0 && <p>No clients yet</p>}

      {clients.map((client) => (
        <div key={client.id}>
          <strong>{client.companyName}</strong>
          <p>{client.email}</p>
        </div>
      ))}
    </div>
  );
}
