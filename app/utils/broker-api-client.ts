const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const brokerApi = {
  // Authentication header helper
  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },

  // Client Roster
  async getClientRoster(brokerId: string) {
    const response = await fetch(`${API_BASE}/api/brokers/${brokerId}/client-roster/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch client roster');
    return response.json();
  },

  // Client Enrollments
  async getClientEnrollments(brokerId: string) {
    const response = await fetch(`${API_BASE}/api/brokers/${brokerId}/client-enrollments/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch client enrollments');
    return response.json();
  },

  // Revenue Metrics
  async getRevenueMetrics(brokerId: string, year: string, month: string) {
    const response = await fetch(
      `${API_BASE}/api/brokers/${brokerId}/revenue-metrics/?year=${year}&month=${month}`,
      { headers: this.getHeaders() }
    );
    if (!response.ok) throw new Error('Failed to fetch revenue metrics');
    return response.json();
  },

  // Provider Directory
  async getProviderDirectory(brokerId: string) {
    const response = await fetch(`${API_BASE}/api/brokers/${brokerId}/provider-directory/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch provider directory');
    return response.json();
  },

  // Enrollment Center
  async getEnrollmentCenter(brokerId: string) {
    const response = await fetch(`${API_BASE}/api/brokers/${brokerId}/enrollment-center/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch enrollment center data');
    return response.json();
  },

  // Messages
  async getMessages(brokerId: string) {
    const response = await fetch(`${API_BASE}/api/brokers/${brokerId}/messages/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  async sendMessage(brokerId: string, data: any) {
    const response = await fetch(`${API_BASE}/api/brokers/${brokerId}/messages/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  },

  // Settings
  async updateSettings(brokerId: string, data: any) {
    const response = await fetch(`${API_BASE}/api/brokers/${brokerId}/update-settings/`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update settings');
    return response.json();
  },
}; 