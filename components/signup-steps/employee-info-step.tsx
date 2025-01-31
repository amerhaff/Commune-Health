import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EmployeeInfoStepProps {
  formData: {
    employeeCount: string
    startDate: string
  }
  onInputChange: (name: string, value: string) => void
}

export function EmployeeInfoStep({ formData, onInputChange }: EmployeeInfoStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="employeeCount">Number of Employees to Enroll</Label>
        <Input
          id="employeeCount"
          type="number"
          value={formData.employeeCount}
          onChange={(e) => onInputChange("employeeCount", e.target.value)}
          placeholder="Enter number of employees"
        />
      </div>
      <div>
        <Label htmlFor="startDate">Desired Start Date</Label>
        <Input
          id="startDate"
          type="date"
          value={formData.startDate}
          onChange={(e) => onInputChange("startDate", e.target.value)}
        />
      </div>
    </div>
  )
}

