interface QuoteRequestData {
  employee_data: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    sex: string;
    dependents?: {
      firstName: string;
      lastName: string;
      relationship: string;
      dateOfBirth: string;
      sex: string;
    }[];
  }[];
}

export const brokerApi = {
  async createQuoteRequest(brokerId: string, data: QuoteRequestData) {
    const response = await fetch(`http://localhost:8000/api/enrollment/quotes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        broker_id: brokerId,
        ...data
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create quote request');
    }

    return response.json();
  },

  async submitProviderEnrollment(quoteRequestId: string, providerId: string, membershipTiers: Record<string, string>) {
    const response = await fetch(`http://localhost:8000/api/enrollment/quotes/${quoteRequestId}/submit_to_provider/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        provider_id: providerId,
        membership_tiers: membershipTiers
      })
    });

    if (!response.ok) {
      throw new Error('Failed to submit provider enrollment');
    }

    return response.json();
  },

  async getQuoteRequests() {
    const response = await fetch(`http://localhost:8000/api/enrollment/quotes/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch quote requests');
    }

    return response.json();
  }
}; 