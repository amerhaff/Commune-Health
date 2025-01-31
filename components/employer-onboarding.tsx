"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usStates } from "@/utils/us-states"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface EmployerOnboardingProps {
  onSubmit: () => void
}

export function EmployerOnboarding({ onSubmit }: EmployerOnboardingProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: "",
    businessStreet: "",
    businessApartment: "",
    businessCity: "",
    businessState: "",
    businessZipCode: "",
    businessWebsite: "",
    industry: "",
    numberOfEmployees: "",
    contactFirstName: "",
    contactLastName: "",
    contactRole: "",
    ein: "",
  })
  const [errors, setErrors] = useState({ ein: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "ein") {
      const einRegex = /^\d{2}-\d{7}$/
      if (!einRegex.test(value)) {
        setErrors({ ...errors, ein: "Invalid EIN format. Please use XX-XXXXXXX." })
      } else {
        setErrors({ ...errors, ein: "" })
      }
    }
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (errors.ein) {
      return
    }

    if (step < 2) {
      setStep(step + 1)
    } else {
      console.log("Employer form submitted:", formData)
      setIsSubmitted(true)
      onSubmit()
    }
  }

  if (isSubmitted) {
    window.location.href = "/employer/home"
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b"></header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader>
              <CardTitle className="!text-left">Business Details</CardTitle>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      className="rounded-full px-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessStreet">Street Address</Label>
                    <Input
                      id="businessStreet"
                      name="businessStreet"
                      value={formData.businessStreet}
                      onChange={handleInputChange}
                      required
                      className="rounded-full px-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessApartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="businessApartment"
                      name="businessApartment"
                      value={formData.businessApartment}
                      onChange={handleInputChange}
                      className="rounded-full px-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessCity">City</Label>
                    <Input
                      id="businessCity"
                      name="businessCity"
                      value={formData.businessCity}
                      onChange={handleInputChange}
                      required
                      className="rounded-full px-6"
                      onKeyDown={(e) => {
                        if (e.key === "Tab" && !e.shiftKey) {
                          e.preventDefault()
                          document.querySelector('button[aria-haspopup="listbox"]')?.focus()
                        }
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessState">State</Label>
                      <Select
                        id="businessState"
                        value={formData.businessState}
                        onValueChange={handleSelectChange("businessState")}
                      >
                        <SelectTrigger className="rounded-full px-6">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {usStates.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessZipCode">ZIP Code (5 digits)</Label>
                      <Input
                        id="businessZipCode"
                        name="businessZipCode"
                        value={formData.businessZipCode}
                        onChange={handleInputChange}
                        required
                        className="rounded-full px-6"
                        type="text"
                        maxLength={5}
                        pattern="\d{5}"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessWebsite">Website</Label>
                    <Input
                      id="businessWebsite"
                      name="businessWebsite"
                      value={formData.businessWebsite}
                      onChange={handleInputChange}
                      required
                      className="rounded-full px-6"
                    />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select id="industry" value={formData.industry} onValueChange={handleSelectChange("industry")}>
                      <SelectTrigger className="rounded-full px-6">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numberOfEmployees">Number of Employees</Label>
                    <Input
                      id="numberOfEmployees"
                      name="numberOfEmployees"
                      type="number"
                      value={formData.numberOfEmployees}
                      onChange={handleInputChange}
                      required
                      className="rounded-full px-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactFirstName">Contact First Name</Label>
                    <Input
                      id="contactFirstName"
                      name="contactFirstName"
                      value={formData.contactFirstName}
                      onChange={handleInputChange}
                      required
                      className="rounded-full px-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactLastName">Contact Last Name</Label>
                    <Input
                      id="contactLastName"
                      name="contactLastName"
                      value={formData.contactLastName}
                      onChange={handleInputChange}
                      required
                      className="rounded-full px-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactRole">Contact Role</Label>
                    <Input
                      id="contactRole"
                      name="contactRole"
                      value={formData.contactRole}
                      onChange={handleInputChange}
                      required
                      className="rounded-full px-6"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="ein">Employer Identification Number (EIN)</Label>
                    <Input
                      id="ein"
                      name="ein"
                      value={formData.ein}
                      onChange={handleInputChange}
                      required
                      className="rounded-full px-6"
                    />
                    {errors.ein && <p className="text-red-500 text-sm">{errors.ein}</p>}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="flex justify-center space-x-4 mt-4">
            {step === 1 && (
              <Button
                type="button"
                onClick={() => (window.location.href = "/signup")}
                className="h-12 text-lg rounded-full px-6 bg-black text-white"
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            {step > 1 && (
              <Button
                type="button"
                onClick={() => setStep(step - 1)}
                className="h-12 text-lg rounded-full px-6 bg-black text-white"
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            <Button type="submit" className="h-12 text-lg rounded-full px-6" style={{ backgroundColor: "#1400FF" }}>
              {step < 2 ? (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Complete Setup"
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

