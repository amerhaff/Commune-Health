const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const providerApi = {
  // Authentication header helper
  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },

  // Dashboard
  async getDashboardMetrics(providerId: string) {
    const response = await fetch(`${API_BASE}/api/providers/${providerId}/dashboard-metrics/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch dashboard metrics');
    return response.json();
  },

  // Revenue
  async getRevenueMetrics(providerId: string, year: string, month: string) {
    const response = await fetch(
      `${API_BASE}/api/providers/${providerId}/revenue-metrics/?year=${year}&month=${month}`,
      { headers: this.getHeaders() }
    );
    if (!response.ok) throw new Error('Failed to fetch revenue metrics');
    return response.json();
  },

  // Messages
  async getMessages(providerId: string) {
    const response = await fetch(`${API_BASE}/api/providers/${providerId}/messages/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  // Profile
  async updateProfile(providerId: string, data: any) {
    const response = await fetch(`${API_BASE}/api/providers/${providerId}/update-profile/`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },
}; 