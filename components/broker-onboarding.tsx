"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usStates } from "@/utils/us-states"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import Link from "next/link"

interface BrokerOnboardingProps {
  onBack: () => void
}

export function BrokerOnboarding({ onBack }: BrokerOnboardingProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    businessWebsite: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    npnNumber: "",
  })
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    city: "",
    npnNumber: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const stateSelectRef = useRef<HTMLSelectElement>(null)

  const validateLettersOnly = (value: string) => {
    return /^[A-Za-z\s]*$/.test(value)
  }

  const validateNPNNumber = (value: string) => {
    return /^\d{10}$/.test(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Validation for letters only
    if (name === "firstName" || name === "lastName" || name === "city") {
      if (!validateLettersOnly(value)) {
        setErrors((prev) => ({ ...prev, [name]: "Please enter letters only" }))
        return // Don't update form data if invalid
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }))
      }
    }

    // Validation for NPN number
    if (name === "npnNumber") {
      if (value.length > 10) return // Prevent input beyond 10 digits
      if (!validateNPNNumber(value)) {
        setErrors((prev) => ({ ...prev, npnNumber: "NPN must be exactly 10 digits" }))
      } else {
        setErrors((prev) => ({ ...prev, npnNumber: "" }))
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.firstName) newErrors.firstName = "This field is required"
    if (!formData.lastName) newErrors.lastName = "This field is required"
    if (!formData.businessName) newErrors.businessName = "This field is required"
    if (!formData.businessWebsite) newErrors.businessWebsite = "This field is required"
    if (!formData.npnNumber) newErrors.npnNumber = "This field is required"
    if (!validateNPNNumber(formData.npnNumber)) {
      newErrors.npnNumber = "NPN must be exactly 10 digits"
    }
    if (!formData.street) newErrors.street = "This field is required"
    if (!formData.city) newErrors.city = "This field is required"
    if (!formData.state) newErrors.state = "This field is required"
    if (!formData.zipCode) newErrors.zipCode = "This field is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      if (step < 2) {
        setStep(2)
      } else {
        console.log("Broker form submitted:", formData)
        setIsSubmitted(true)
      }
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6 pt-20">
        <h2 className="text-2xl font-bold">Thank You for Signing Up!</h2>
        <p className="text-xl text-gray-600">We will notify you when we have confirmed your information.</p>
        <div className="flex justify-center">
          <Button
            onClick={() => (window.location.href = "/")}
            className="h-12 text-lg rounded-full px-6 flex items-center justify-center space-x-2"
            style={{ backgroundColor: "#1400FF" }}
          >
            <span>Go to Home</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 pt-12">
      {/* Removed h2 tag */}
      {step === 1 && (
        <>
          <Card className="relative mb-6">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader className="relative z-10">
              <CardTitle>Business Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="rounded-full px-6"
                    />
                    {errors.firstName && <p className="text-sm text-red-500 px-2">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="rounded-full px-6"
                    />
                    {errors.lastName && <p className="text-sm text-red-500 px-2">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                    className="rounded-full px-6"
                  />
                  {errors.businessName && <p className="text-sm text-red-500 px-2">{errors.businessName}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="businessWebsite">Business Website</Label>
                  <Input
                    id="businessWebsite"
                    name="businessWebsite"
                    value={formData.businessWebsite}
                    onChange={handleInputChange}
                    required
                    className="rounded-full px-6"
                  />
                  {errors.businessWebsite && <p className="text-sm text-red-500 px-2">{errors.businessWebsite}</p>}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="npnNumber">NPN Number (10 digits)</Label>
                    <a
                      href="https://nipr.com/help/look-up-your-npn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Check NPN Number
                    </a>
                  </div>
                  <Input
                    id="npnNumber"
                    name="npnNumber"
                    value={formData.npnNumber}
                    onChange={handleInputChange}
                    required
                    maxLength={10}
                    pattern="\d{10}"
                    className="rounded-full px-6"
                  />
                  {errors.npnNumber && <p className="text-sm text-red-500 px-2">{errors.npnNumber}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative mb-6">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader className="relative z-10">
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                    className="rounded-full px-6"
                  />
                  {errors.street && <p className="text-sm text-red-500 px-2">{errors.street}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="rounded-full px-6"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="rounded-full px-6"
                    />
                    {errors.city && <p className="text-sm text-red-500 px-2">{errors.city}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="state">State</Label>
                    <Select value={formData.state} onValueChange={handleSelectChange("state")}>
                      <SelectTrigger className="rounded-full px-6" ref={stateSelectRef}>
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        {usStates.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && <p className="text-sm text-red-500 px-2">{errors.state}</p>}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="zipCode">ZIP Code (5 digits)</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    type="text"
                    maxLength={5}
                    pattern="\d{5}"
                    className="rounded-full px-6"
                  />
                  {errors.zipCode && <p className="text-sm text-red-500 px-2">{errors.zipCode}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
      {step === 2 && (
        <Card className="relative mb-6">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
          <CardHeader className="relative z-10">
            <CardTitle>Confirm Your Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Name</TableCell>
                    <TableCell>
                      {formData.firstName} {formData.lastName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Business Name</TableCell>
                    <TableCell>{formData.businessName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Business Website</TableCell>
                    <TableCell>{formData.businessWebsite}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">NPN Number</TableCell>
                    <TableCell>{formData.npnNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Address</TableCell>
                    <TableCell>
                      {formData.street}
                      {formData.apartment && `, ${formData.apartment}`}
                      {`, ${formData.city}, ${formData.state} ${formData.zipCode}`}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="flex justify-center space-x-4">
        {step > 1 && (
          <Button
            type="button"
            onClick={() => setStep(step - 1)}
            className="h-12 text-lg rounded-full px-6 bg-black text-white flex items-center justify-center"
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back</span>
          </Button>
        )}
{step === 1 && (
  <Button
    type="button"
    onClick={onBack}
    className="h-12 text-lg rounded-full px-6 bg-black text-white flex items-center justify-center"
    variant="outline"
  >
    <ArrowLeft className="h-4 w-4 mr-2" />
    <span>Back</span>
  </Button>
)}

<Button
  type="submit"
  className="h-12 text-lg rounded-full px-6 flex items-center justify-center space-x-2"
  style={{ backgroundColor: "#1400FF" }}
>
  {step < 2 ? (
    <>
      <span>Next</span>
      <ArrowRight className="h-4 w-4 ml-2" />
    </>
  ) : (
    <span>Submit</span>
  )}
</Button>
      </div>
    </form>
  )
}

