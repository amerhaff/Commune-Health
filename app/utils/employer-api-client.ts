const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const employerApi = {
  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },

  // Employee Roster
  async getEmployeeRoster(employerId: string) {
    const response = await fetch(`${API_BASE}/api/employers/${employerId}/employee-roster/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch employee roster');
    return response.json();
  },

  async addEmployee(employerId: string, employeeData: any) {
    const response = await fetch(`${API_BASE}/api/employers/${employerId}/add-employee/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(employeeData),
    });
    if (!response.ok) throw new Error('Failed to add employee');
    return response.json();
  },

  // Healthcare Spend
  async getHealthcareSpend(employerId: string, year: string, month: string) {
    const response = await fetch(
      `${API_BASE}/api/employers/${employerId}/healthcare-spend/?year=${year}&month=${month}`,
      { headers: this.getHeaders() }
    );
    if (!response.ok) throw new Error('Failed to fetch healthcare spend data');
    return response.json();
  },

  // Enrollment Stats
  async getEnrollmentStats(employerId: string) {
    const response = await fetch(`${API_BASE}/api/employers/${employerId}/enrollment-stats/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch enrollment stats');
    return response.json();
  },

  // Provider Directory
  async getProviderDirectory(employerId: string) {
    const response = await fetch(`${API_BASE}/api/employers/${employerId}/provider-directory/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch provider directory');
    return response.json();
  },

  // Messages
  async getMessages(employerId: string) {
    const response = await fetch(`${API_BASE}/api/employers/${employerId}/messages/`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  async sendMessage(employerId: string, messageData: any) {
    const response = await fetch(`${API_BASE}/api/employers/${employerId}/messages/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(messageData),
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  },

  // Settings
  async updateSettings(employerId: string, settingsData: any) {
    const response = await fetch(`${API_BASE}/api/employers/${employerId}/update-settings/`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(settingsData),
    });
    if (!response.ok) throw new Error('Failed to update settings');
    return response.json();
  },
}; 