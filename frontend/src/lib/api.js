"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class ClientAPI {
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || response.statusText);
    }

    return response.json();
  }

  login(email, password) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData ),
    });
  }

  logout() {
    localStorage.removeItem("token");
  }

  getDashboardStats() {
    return this.request("/dashboard/stats");
  }

  // CLIENTS
getClients() {
  return this.request("/clients");
}

getClient(id) {
  return this.request(`/clients/${id}`);
}

createClient(data) {
  return this.request("/clients", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

updateClient(id, data) {
  return this.request(`/clients/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

deleteClient(id) {
  return this.request(`/clients/${id}`, {
    method: "DELETE",
  });
}

}

export default new ClientAPI();
