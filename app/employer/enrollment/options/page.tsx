"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function EnrollmentOptionsPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [coverageStructure, setCoverageStructure] = useState("")
  const [contributionAmount, setContributionAmount] = useState("")
  const [familySizeContributions, setFamilySizeContributions] = useState({
    single: "",
    spouse: "",
    family: "",
  })
  const [excludedEmployees, setExcludedEmployees] = useState({
    partTime: false,
    temporary: false,
    contract: false,
  })

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Here you would typically save the form data to your state management solution
      // For now, we'll just log it and navigate to the provider selection page
      console.log({
        coverageStructure,
        contributionAmount,
        familySizeContributions,
        excludedEmployees,
      })
      router.push("/employer/enrollment/provider")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Enrollment Options</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Step {step} of 3:{" "}
            {step === 1 ? "Coverage Structure" : step === 2 ? "Contribution Details" : "Employee Eligibility"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <RadioGroup value={coverageStructure} onValueChange={setCoverageStructure}>
              <div className="flex items-center space-x-2 mb-4">
                <RadioGroupItem value="same" id="same" />
                <Label htmlFor="same">All Employees Same Amount</Label>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <RadioGroupItem value="family" id="family" />
                <Label htmlFor="family">Vary By Family Size</Label>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Customize Coverage</Label>
              </div>
            </RadioGroup>
          )}
          {step === 2 && coverageStructure === "same" && (
            <div className="space-y-4">
              <Label htmlFor="amount">Contribution Amount (per month)</Label>
              <Input
                id="amount"
                placeholder="Enter dollar amount"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
              />
            </div>
          )}
          {step === 2 && coverageStructure === "family" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="single">Single Employee</Label>
                <Input
                  id="single"
                  placeholder="Enter dollar amount"
                  value={familySizeContributions.single}
                  onChange={(e) => setFamilySizeContributions({ ...familySizeContributions, single: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="spouse">Employee + Spouse</Label>
                <Input
                  id="spouse"
                  placeholder="Enter dollar amount"
                  value={familySizeContributions.spouse}
                  onChange={(e) => setFamilySizeContributions({ ...familySizeContributions, spouse: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="family">Employee + Family</Label>
                <Input
                  id="family"
                  placeholder="Enter dollar amount"
                  value={familySizeContributions.family}
                  onChange={(e) => setFamilySizeContributions({ ...familySizeContributions, family: e.target.value })}
                />
              </div>
            </div>
          )}
          {step === 3 && coverageStructure === "custom" && (
            <div className="space-y-4">
              <Label>Exclude from coverage:</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="partTime"
                    checked={excludedEmployees.partTime}
                    onCheckedChange={(checked) =>
                      setExcludedEmployees({ ...excludedEmployees, partTime: checked as boolean })
                    }
                  />
                  <Label htmlFor="partTime">Part-time workers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="temporary"
                    checked={excludedEmployees.temporary}
                    onCheckedChange={(checked) =>
                      setExcludedEmployees({ ...excludedEmployees, temporary: checked as boolean })
                    }
                  />
                  <Label htmlFor="temporary">Temporary workers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="contract"
                    checked={excludedEmployees.contract}
                    onCheckedChange={(checked) =>
                      setExcludedEmployees({ ...excludedEmployees, contract: checked as boolean })
                    }
                  />
                  <Label htmlFor="contract">Contract workers</Label>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Button onClick={handleContinue}>{step < 3 ? "Continue" : "Proceed to Provider Selection"}</Button>
    </div>
  )
}

