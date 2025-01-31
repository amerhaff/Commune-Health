import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CompanyInfoStepProps {
  formData: {
    companyName: string
    companySize: string
    industry: string
  }
  onInputChange: (name: string, value: string) => void
}

export function CompanyInfoStep({ formData, onInputChange }: CompanyInfoStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => onInputChange("companyName", e.target.value)}
          placeholder="Enter your company name"
        />
      </div>
      <div>
        <Label htmlFor="companySize">Company Size</Label>
        <Select value={formData.companySize} onValueChange={(value) => onInputChange("companySize", value)}>
          <SelectTrigger id="companySize">
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-10">1-10 employees</SelectItem>
            <SelectItem value="11-50">11-50 employees</SelectItem>
            <SelectItem value="51-200">51-200 employees</SelectItem>
            <SelectItem value="201-500">201-500 employees</SelectItem>
            <SelectItem value="501+">501+ employees</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="industry">Industry</Label>
        <Select value={formData.industry} onValueChange={(value) => onInputChange("industry", value)}>
          <SelectTrigger id="industry">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

