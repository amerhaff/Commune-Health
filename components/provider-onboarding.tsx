"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link" // Import Link
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { usStates } from "@/utils/us-states"
import { ArrowLeft, ArrowRight, Upload, Plus, Trash2 } from "lucide-react"

interface MembershipTier {
  name: string
  price: number
  description: string
}

interface ResidencyFellowship {
  institution: string
  specialty: string
  graduationYear: string
}

export function ProviderOnboarding() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    credential: "",
    medicalSchoolInstitution: "",
    medicalSchoolGraduationYear: "",
    yearsOfExperience: "",
    residency: { graduationYear: "" } as ResidencyFellowship,
    fellowship: {} as ResidencyFellowship,
    practiceName: "",
    practiceStreet: "",
    practiceApartment: "",
    practiceCity: "",
    practiceState: "",
    practiceZipCode: "",
    practiceWebsite: "",
    practiceHours: {
      monday: { open: "", close: "", isOpen: false },
      tuesday: { open: "", close: "", isOpen: false },
      wednesday: { open: "", close: "", isOpen: false },
      thursday: { open: "", close: "", isOpen: false },
      friday: { open: "", close: "", isOpen: false },
      saturday: { open: "", close: "", isOpen: false },
      sunday: { open: "", close: "", isOpen: false },
    },
    membershipTiers: [] as MembershipTier[],
    headshot: null as File | null,
    headshotPreview: "" as string | null,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleResidencyFellowshipChange = (
    type: "residency" | "fellowship",
    field: keyof ResidencyFellowship,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({
        ...prev,
        headshot: file,
        headshotPreview: URL.createObjectURL(file),
      }))
    }
  }

  const handleHoursChange = (day: string, field: "open" | "close" | "isOpen", value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      practiceHours: {
        ...prev.practiceHours,
        [day]: {
          ...prev.practiceHours[day as keyof typeof prev.practiceHours],
          [field]: value,
        },
      },
    }))
  }

  const handleAddTier = () => {
    setFormData((prev) => ({
      ...prev,
      membershipTiers: [...prev.membershipTiers, { name: "", price: 0, description: "" }],
    }))
  }

  const handleTierChange = (index: number, field: keyof MembershipTier, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      membershipTiers: prev.membershipTiers.map((tier, i) => (i === index ? { ...tier, [field]: value } : tier)),
    }))
  }

  const handleRemoveTier = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      membershipTiers: prev.membershipTiers.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
    } else {
      console.log("Provider form submitted:", formData)
      setIsSubmitted(true)
    }
  }

  const isDoctor = formData.credential === "MD" || formData.credential === "DO"
  const isNursePractitioner = formData.credential === "NP"
  const isPhysicianAssistant = formData.credential === "PA"

  const getSchoolLabel = () => {
    switch (formData.credential) {
      case "MD":
      case "DO":
        return "Medical School"
      case "PA":
        return "Physician Assistant School"
      case "NP":
        return "Nurse Practitioner School"
      default:
        return "School"
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      window.location.href = "/signup" // Navigate to /signup
    }
  }

  useEffect(() => {
    // Clean up the object URL when the component unmounts or the file changes
    return () => {
      if (formData.headshotPreview) {
        URL.revokeObjectURL(formData.headshotPreview)
      }
    }
  }, [formData.headshotPreview])

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6 pt-20">
        <h2 className="text-2xl font-bold">Thank You for Signing Up!</h2>
        <p className="text-xl text-gray-600">We will notify you when we have confirmed your information.</p>
        <div className="flex justify-center">
          <Button
            onClick={() => (window.location.href = "/")}
            className="h-12 text-lg rounded-full px-6"
            style={{ backgroundColor: "#1400FF" }}
          >
            Go to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 pt-16">
      {step === 1 && (
        <>
          <Card className="relative mb-6">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardHeader className="relative z-10">
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
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
                </div>
              </div>
              <div className="space-y-1 mt-4">
                <Label htmlFor="credential">Credential</Label>
                <Select value={formData.credential} onValueChange={handleSelectChange("credential")}>
                  <SelectTrigger className="rounded-full px-6">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MD">MD</SelectItem>
                    <SelectItem value="DO">DO</SelectItem>
                    <SelectItem value="PA">PA</SelectItem>
                    <SelectItem value="NP">NP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1 mt-4">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  className="rounded-full px-6"
                />
              </div>
              <div className="mt-6">
                <input // Hidden file input
                  type="file"
                  id="headshot"
                  name="headshot"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button // Button to trigger file input
                  className="rounded-full px-6"
                  onClick={() => fileInputRef.current?.click()} // Trigger file input click
                >
                  <Upload className="w-4 h-4 mr-2" /> Upload Headshot
                </Button>
                {formData.headshotPreview && (
                  <Image
                    src={formData.headshotPreview || "/placeholder.svg"}
                    alt="Headshot Preview"
                    width={100}
                    height={100}
                    className="rounded-full mt-2"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {formData.credential && (
            <Card className="relative mb-6">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
              <CardHeader className="relative z-10">
                <CardTitle className="z-10">{getSchoolLabel()}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="medicalSchoolInstitution">Institution</Label>
                  <Input
                    id="medicalSchoolInstitution"
                    name="medicalSchoolInstitution"
                    value={formData.medicalSchoolInstitution}
                    onChange={handleInputChange}
                    required
                    className="rounded-full px-6"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="medicalSchoolGraduationYear">Graduation Year</Label>
                  <Input
                    id="medicalSchoolGraduationYear"
                    name="medicalSchoolGraduationYear"
                    value={formData.medicalSchoolGraduationYear}
                    onChange={handleInputChange}
                    required
                    className="rounded-full px-6"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {isDoctor && (
            <Card className="relative mb-6">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
              <CardHeader className="relative z-10">
                <CardTitle className="z-10">Residency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="residencyInstitution">Institution</Label>
                  <Input
                    id="residencyInstitution"
                    value={formData.residency.institution}
                    onChange={(e) => handleResidencyFellowshipChange("residency", "institution", e.target.value)}
                    required
                    className="rounded-full px-6"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="residencySpecialty">Specialty</Label>
                  <Input
                    id="residencySpecialty"
                    value={formData.residency.specialty}
                    onChange={(e) => handleResidencyFellowshipChange("residency", "specialty", e.target.value)}
                    required
                    className="rounded-full px-6"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="residencyGraduationYear">Graduation Year</Label>
                  <Input
                    id="residencyGraduationYear"
                    value={formData.residency.graduationYear}
                    onChange={(e) => handleResidencyFellowshipChange("residency", "graduationYear", e.target.value)}
                    required
                    className="rounded-full px-6"
                  />
                </div>
              </CardContent>
            </Card>
          )}
          {isDoctor && (
            <Card className="relative mb-6">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
              <CardHeader className="relative z-10">
                <CardTitle className="z-10">Fellowship (if applicable)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="fellowshipInstitution">Institution</Label>
                  <Input
                    id="fellowshipInstitution"
                    value={formData.fellowship.institution}
                    onChange={(e) => handleResidencyFellowshipChange("fellowship", "institution", e.target.value)}
                    className="rounded-full px-6"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="fellowshipSpecialty">Specialty</Label>
                  <Input
                    id="fellowshipSpecialty"
                    value={formData.fellowship.specialty}
                    onChange={(e) => handleResidencyFellowshipChange("fellowship", "specialty", e.target.value)}
                    className="rounded-full px-6"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="fellowshipGraduationYear">Graduation Year</Label>
                  <Input
                    id="fellowshipGraduationYear"
                    value={formData.fellowship.graduationYear}
                    onChange={(e) => handleResidencyFellowshipChange("fellowship", "graduationYear", e.target.value)}
                    className="rounded-full px-6"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
      {step === 2 && (
        <>
          <Card className="relative mb-6">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader className="relative z-10">
              <CardTitle>Practice Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="practiceName">Practice Name</Label>
                <Input
                  id="practiceName"
                  name="practiceName"
                  value={formData.practiceName}
                  onChange={handleInputChange}
                  required
                  className="rounded-full px-6"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="practiceStreet">Street Address</Label>
                <Input
                  id="practiceStreet"
                  name="practiceStreet"
                  value={formData.practiceStreet}
                  onChange={handleInputChange}
                  required
                  className="rounded-full px-6"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="practiceApartment">Apartment, suite, etc. (optional)</Label>
                <Input
                  id="practiceApartment"
                  name="practiceApartment"
                  value={formData.practiceApartment}
                  onChange={handleInputChange}
                  className="rounded-full px-6"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="practiceCity">City</Label>
                <Input
                  id="practiceCity"
                  name="practiceCity"
                  value={formData.practiceCity}
                  onChange={handleInputChange}
                  required
                  className="rounded-full px-6"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="practiceState">State</Label>
                  <Select value={formData.practiceState} onValueChange={handleSelectChange("practiceState")}>
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
                <div className="space-y-1">
                  <Label htmlFor="practiceZipCode">ZIP Code</Label>
                  <Input
                    id="practiceZipCode"
                    name="practiceZipCode"
                    placeholder="ZIP Code"
                    type="text"
                    maxLength={5}
                    pattern="\d{5}"
                    value={formData.practiceZipCode}
                    onChange={handleInputChange}
                    required
                    className="rounded-full px-6"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="practiceWebsite">Practice Website</Label>
                <Input
                  id="practiceWebsite"
                  name="practiceWebsite"
                  value={formData.practiceWebsite}
                  onChange={handleInputChange}
                  required
                  className="rounded-full px-6"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardHeader className="relative z-10">
              <CardTitle>Practice Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Day</TableHead>
                    <TableHead>Open</TableHead>
                    <TableHead>Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(formData.practiceHours).map(([day, hours]) => (
                    <TableRow key={day}>
                      <TableCell className="font-medium capitalize">{day}</TableCell>
                      <TableCell>
                        <Checkbox
                          id={`${day}-open`}
                          checked={hours.isOpen}
                          onCheckedChange={(checked) => handleHoursChange(day, "isOpen", checked)}
                        />
                      </TableCell>
                      <TableCell>
                        {hours.isOpen ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="time"
                              value={hours.open}
                              onChange={(e) => handleHoursChange(day, "open", e.target.value)}
                              className="w-24"
                            />
                            <span>to</span>
                            <Input
                              type="time"
                              value={hours.close}
                              onChange={(e) => handleHoursChange(day, "close", e.target.value)}
                              className="w-24"
                            />
                          </div>
                        ) : (
                          <span className="text-gray-500">Closed</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
      {step === 3 && (
        <div className="space-y-6">
          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardHeader className="relative z-10">
              <CardTitle>Membership Tiers</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold">Set Your Membership Tiers</h3>
              <p className="text-gray-600">Define the membership tiers you want to offer to your patients.</p>
              {formData.membershipTiers.map((tier, index) => (
                <Card key={index} className="p-4 relative">
                  <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
                  <CardHeader>
                    <CardTitle className="text-lg">Tier {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor={`tierName-${index}`}>Tier Name</Label>
                      <Input
                        id={`tierName-${index}`}
                        placeholder="Tier Name"
                        value={tier.name}
                        onChange={(e) => handleTierChange(index, "name", e.target.value)}
                        className="rounded-full px-6"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`tierPrice-${index}`}>Monthly Price ($)</Label>
                      <Input
                        id={`tierPrice-${index}`}
                        type="number"
                        value={tier.price}
                        onChange={(e) => handleTierChange(index, "price", Number.parseFloat(e.target.value))}
                        className="rounded-full px-6"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`tierDescription-${index}`}>Description</Label>
                      <Input
                        id={`tierDescription-${index}`}
                        placeholder="Description"
                        value={tier.description}
                        onChange={(e) => handleTierChange(index, "description", e.target.value)}
                        className="rounded-full px-6"
                      />
                    </div>
                    <div className="flex justify-center space-x-4">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleRemoveTier(index)}
                        className="rounded-full"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Tier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button type="button" onClick={handleAddTier} className="w-full rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Add New Tier
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      {step === 4 && (
        <Card className="relative">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
          <CardHeader className="relative z-10">
            <CardTitle>Review Your Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Personal Information</h4>
                <p>
                  Name: {formData.firstName} {formData.lastName}
                </p>
                <p>Credential: {formData.credential}</p>
                <p>Years of Experience: {formData.yearsOfExperience}</p>
                <p>
                  {getSchoolLabel()}: {formData.medicalSchoolInstitution}
                </p>
                {isDoctor && (
                  <>
                    <p>
                      Residency: {formData.residency.institution}, {formData.residency.specialty},{" "}
                      {formData.residency.graduationYear}
                    </p>
                    {formData.fellowship.institution && (
                      <p>
                        Fellowship: {formData.fellowship.institution}, {formData.fellowship.specialty},{" "}
                        {formData.fellowship.graduationYear}
                      </p>
                    )}
                  </>
                )}
                {formData.headshotPreview && (
                  <Image
                    src={formData.headshotPreview || "/placeholder.svg"}
                    alt="Headshot"
                    width={100}
                    height={100}
                    className="rounded-full mt-2"
                  />
                )}
              </div>
              <div>
                <h4 className="font-semibold">Practice Information</h4>
                <p>Name: {formData.practiceName}</p>
                <p>Address: {formData.practiceStreet}</p>
                {formData.practiceApartment && <p>Suite/Apt: {formData.practiceApartment}</p>}
                <p>
                  {formData.practiceCity}, {formData.practiceState} {formData.practiceZipCode}
                </p>
                <p>Website: {formData.practiceWebsite}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Practice Hours</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(formData.practiceHours).map(([day, hours]) => (
                    <TableRow key={day}>
                      <TableCell className="font-medium capitalize">{day}</TableCell>
                      <TableCell>{hours.isOpen ? `${hours.open} to ${hours.close}` : "Closed"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h4 className="font-semibold">Membership Tiers</h4>
              {formData.membershipTiers.map((tier, index) => (
                <div key={index} className="mb-4">
                  <h5 className="font-medium">
                    Tier {index + 1}: {tier.name}
                  </h5>
                  <p>Price: ${tier.price}/month</p>
                  <p>Description: {tier.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      <div className="flex justify-center space-x-4">
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="h-12 text-lg rounded-full px-6 bg-black text-white hover:bg-gray-800"
            style={{ backgroundColor: "black", color: "white" }} // Added inline styles
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        )}
        {step === 1 && ( // Conditionally render the back button on step 1
          <Button
            asChild
            type="button"
            className="h-12 text-lg rounded-full px-6 bg-black text-white hover:bg-gray-800"
            style={{ backgroundColor: "black", color: "white" }} // Added inline styles
          >
            <Link href="/signup">
              {" "}
              {/* Link to /signup */}
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Link>
          </Button>
        )}
        <Button type="submit" className="h-12 text-lg rounded-full px-6" style={{ backgroundColor: "#1400FF" }}>
          {step < 4 ? (
            <>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </div>
    </form>
  )
}

