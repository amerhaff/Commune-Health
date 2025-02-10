const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const providerApi = {
  getDashboardMetrics: async (providerId: string) => {
    const response = await fetch(`${API_BASE}/api/providers/${providerId}/dashboard-metrics/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  },

  getRevenueMetrics: async (providerId: string, year: string, month: string) => {
    const response = await fetch(
      `${API_BASE}/api/providers/${providerId}/revenue-metrics/?year=${year}&month=${month}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.json();
  },

  updateProfile: async (providerId: string, profileData: any) => {
    const response = await fetch(`${API_BASE}/api/providers/${providerId}/profile/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });
    return response.json();
  },

  // Add other API methods...
}; 