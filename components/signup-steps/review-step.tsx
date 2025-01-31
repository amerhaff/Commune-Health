interface ReviewStepProps {
  formData: {
    companyName: string
    companySize: string
    industry: string
    selectedPlan: string
    employeeCount: string
    startDate: string
  }
}

export function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
      <div>
        <h3 className="font-medium">Company Information</h3>
        <p>Company Name: {formData.companyName}</p>
        <p>Company Size: {formData.companySize}</p>
        <p>Industry: {formData.industry}</p>
      </div>
      <div>
        <h3 className="font-medium">Selected Plan</h3>
        <p>{formData.selectedPlan}</p>
      </div>
      <div>
        <h3 className="font-medium">Employee Information</h3>
        <p>Number of Employees to Enroll: {formData.employeeCount}</p>
        <p>Desired Start Date: {formData.startDate}</p>
      </div>
    </div>
  )
}

