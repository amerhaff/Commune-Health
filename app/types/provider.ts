export interface DashboardMetrics {
  total_patients: number;
  monthly_revenue: number;
  pending_appointments: number;
  unread_messages: number;
  pending_enrollments: number;
}

export interface RevenueMetrics {
  employer_revenues: EmployerRevenue[];
  total_monthly_revenue: number;
  total_annual_revenue: number;
  year_to_date_revenue: number;
}

// Add other interfaces... 