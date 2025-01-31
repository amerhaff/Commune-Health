import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PlanSelectionStepProps {
  formData: {
    selectedPlan: string
  }
  onInputChange: (name: string, value: string) => void
}

export function PlanSelectionStep({ formData, onInputChange }: PlanSelectionStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Select a Plan</h2>
      <RadioGroup value={formData.selectedPlan} onValueChange={(value) => onInputChange("selectedPlan", value)}>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="basic" id="basic" />
          <Label htmlFor="basic">Basic Plan</Label>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="standard" id="standard" />
          <Label htmlFor="standard">Standard Plan</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="premium" id="premium" />
          <Label htmlFor="premium">Premium Plan</Label>
        </div>
      </RadioGroup>
    </div>
  )
}

