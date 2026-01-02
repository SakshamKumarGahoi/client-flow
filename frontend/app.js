const API_URL = "https://clientflow-1sk4.onrender.com/api";

   
   class ClientAPI {
     constructor() {
       this.token = localStorage.getItem('token');
     }
   
     async request(endpoint, options = {}) {
       const url = `${API_URL}${endpoint}`;
       const config = {
         ...options,
         headers: {
           'Content-Type': 'application/json',
           ...options.headers,
         }
       };
       
       if (this.token) {
         config.headers.Authorization = `Bearer ${this.token}`;
       }
       
       const response = await fetch(url, config);
       
       if (response.status === 401) {
         // Handle unauthorized
         this.logout();
         window.location.href = '/login';
       }
       
       if (!response.ok) {
         throw new Error(`API Error: ${response.statusText}`);
       }
       
       return response.json();
     }
   
     // Auth methods
     async login(email, password) {
       const data = await this.request('/auth/login', {
         method: 'POST',
         body: JSON.stringify({ email, password })
       });
       this.token = data.token;
       localStorage.setItem('token', data.token);
       return data;
     }
   
     async register(userData) {
       const data = await this.request('/auth/register', {
         method: 'POST',
         body: JSON.stringify(userData)
       });
       this.token = data.token;
       localStorage.setItem('token', data.token);
       return data;
     }
   
     logout() {
       this.token = null;
       localStorage.removeItem('token');
     }
   
     // Client methods
     async getClients(params = {}) {
       const queryString = new URLSearchParams(params).toString();
       return this.request(`/clients${queryString ? `?${queryString}` : ''}`);
     }
   
     async getClient(id) {
       return this.request(`/clients/${id}`);
     }
   
     async createClient(clientData) {
       return this.request('/clients', {
         method: 'POST',
         body: JSON.stringify(clientData)
       });
     }
   
     async updateClient(id, clientData) {
       return this.request(`/clients/${id}`, {
         method: 'PUT',
         body: JSON.stringify(clientData)
       });
     }
   
     async deleteClient(id) {
       return this.request(`/clients/${id}`, {
         method: 'DELETE'
       });
     }
   
     // Analytics
     async getDashboardStats() {
       return this.request('/analytics/dashboard');
     }
   }
   
   const api = new ClientAPI();