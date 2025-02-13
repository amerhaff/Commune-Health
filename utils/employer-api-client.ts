interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  sex: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface DependentData {
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
  sex: string;
}

export const employerApi = {
  // Add a new employee
  async addEmployee(employerId: string, data: EmployeeData) {
    const response = await fetch(`http://localhost:8000/api/accounts/employers/${employerId}/employees/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to add employee');
    }

    return response.json();
  },

  // Add a dependent to an employee
  async addDependent(employeeId: string, data: DependentData) {
    const response = await fetch(`http://localhost:8000/api/accounts/employees/${employeeId}/dependents/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to add dependent');
    }

    return response.json();
  },

  async createEnrollmentRequest(providerId: string, enrollments: {
    employee_ids: string[],
    dependent_ids: string[],
    membership_tiers: Record<string, string>
  }) {
    const response = await fetch(`http://localhost:8000/api/enrollment/requests/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        provider_id: providerId,
        enrollments
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create enrollment request');
    }

    return response.json();
  },

  async getEnrollmentRequests() {
    const response = await fetch(`http://localhost:8000/api/enrollment/requests/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch enrollment requests');
    }

    return response.json();
  }
}; 