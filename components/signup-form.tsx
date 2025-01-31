"use client"

import { useState } from "react"
import { CompanyInfoStep } from "./signup-steps/company-info-step"
import { PlanSelectionStep } from "./signup-steps/plan-selection-step"
import { EmployeeInfoStep } from "./signup-steps/employee-info-step"
import { ReviewStep } from "./signup-steps/review-step"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from 'lucide-react'

const steps = [
  { title: "Company Information", component: CompanyInfoStep },
  { title: "Plan Selection", component: PlanSelectionStep },
  { title: "Employee Information", component: EmployeeInfoStep },
  { title: "Review", component: ReviewStep },
]

export function SignupForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    companyName: "",
    companySize: "",
    industry: "",
    selectedPlan: "",
    employeeCount: "",
    startDate: "",
  })

  const CurrentStepComponent = steps[currentStep].component

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the formData to your backend
    console.log("Form submitted:", formData)
    // For demonstration, we'll just move to the next step
    handleNext()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`flex-1 text-center ${
                index <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div className="relative">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${
                    index <= currentStep ? "border-blue-600 bg-blue-100" : "border-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-4 left-1/2 w-full h-0.5 ${
                      index < currentStep ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
              <div className="mt-2 text-sm font-medium">{step.title}</div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <CurrentStepComponent formData={formData} onInputChange={handleInputChange} />
        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNext} className="ml-auto">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="ml-auto">
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

