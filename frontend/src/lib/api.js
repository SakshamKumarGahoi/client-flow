"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class ClientAPI {
  constructor() {
    this.token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;
  }

  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      this.logout();
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || response.statusText);
    }

    return response.json();
  }

  async login(email, password) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    this.token = data.token;
    localStorage.setItem("token", data.token);
    return data;
  }

  async register(userData) {
    const data = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    this.token = data.token;
    localStorage.setItem("token", data.token);
    return data;
  }

  logout() {
    this.token = null;
    localStorage.removeItem("token");
  }
  getUsers() {
  return this.request("/users");
}

getDashboardStats() {
  return this.request("/dashboard/stats");
}


}

const api = new ClientAPI();
export default api;
