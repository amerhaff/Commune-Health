"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"
import { usStates } from "@/utils/us-states"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function ProviderSettingsPage() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phoneNumber: "555-0123",
    credentials: "MD",
    specialty: "Family Medicine",
    npi: "1234567890",
    headshot: null as File | null,
    headshotPreview: "" as string | null, // Add preview URL state
    medicalSchool: "",
    medicalSchoolGraduationYear: "",
    residency: "",
    residencySpecialty: "",
    residencyGraduationYear: "",
    fellowship: "",
    fellowshipSpecialty: "",
    fellowshipGraduationYear: "",
    npSchool: "",
    npGraduationYear: "",
    paSchool: "",
    paGraduationYear: "",
  })

  const [practiceInfo, setPracticeInfo] = useState({
    practiceName: "HealthFirst Clinic",
    practiceStreet: "123 Health St",
    practiceApartment: "Suite 100",
    practiceCity: "Anytown",
    practiceState: "CA",
    practiceZipCode: "12345",
    practiceWebsite: "www.healthfirst.com",
  })

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value })
  }

  const handlePracticeInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPracticeInfo({ ...practiceInfo, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPersonalInfo((prev) => ({
        ...prev,
        headshot: file,
        headshotPreview: URL.createObjectURL(file),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated info to your backend
    console.log("Updated info:", { personalInfo, practiceInfo })
  }

  useEffect(() => {
    // Clean up the object URL when the component unmounts or the file changes
    return () => {
      if (personalInfo.headshotPreview) {
        URL.revokeObjectURL(personalInfo.headshotPreview)
      }
    }
  }, [personalInfo.headshotPreview])

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="border-b mb-8">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link className="flex items-center space-x-2" href="/">
            <Image
              src="/Simpliwell_logo.png"
              alt="Simpliwell"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" className="flex items-center space-x-2">
              <Link href="/provider/home">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
            <Button
              onClick={() => {
                window.location.href = "/"
              }}
              className="rounded-full"
              style={{ backgroundColor: "#1400FF" }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <h1 className="text-3xl font-bold mb-6">Provider Settings</h1>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
              Personal Information
            </TabsTrigger>
            <TabsTrigger value="practice" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
              Practice Information
            </TabsTrigger>
            <TabsTrigger value="training" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
              Training Information
            </TabsTrigger>
            <TabsTrigger value="password" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
              Change Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" /> {/* Blue strip */}
              <CardHeader className="relative z-10">
                {" "}
                {/* Ensure z-index for proper layering */}
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={personalInfo.firstName}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={personalInfo.lastName}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={personalInfo.phoneNumber}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credentials">Credentials</Label>
                  <Input
                    id="credentials"
                    name="credentials"
                    value={personalInfo.credentials}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input
                    id="specialty"
                    name="specialty"
                    value={personalInfo.specialty}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="npi">NPI Number</Label>
                  <Input id="npi" name="npi" value={personalInfo.npi} onChange={handlePersonalInfoChange} />
                </div>
                <div className="space-y-2">
                  <Label>Headshot</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      onClick={() => document.getElementById("headshot-upload")?.click()}
                      className="rounded-full px-6 py-2 bg-[#1400FF] text-white hover:bg-blue-700"
                      style={{ backgroundColor: "#1400FF" }}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                    <span className="text-sm text-gray-500">
                      {personalInfo.headshot ? personalInfo.headshot.name : "No file chosen"}
                    </span>
                    {personalInfo.headshotPreview && ( // Conditionally render the preview
                      <Image
                        src={personalInfo.headshotPreview || "/placeholder.svg"}
                        alt="Headshot Preview"
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                    )}
                  </div>
                  <input
                    id="headshot-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practice">
            <Card className="relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" /> {/* Blue strip */}
              <CardHeader className="relative z-10">
                {" "}
                {/* Ensure z-index for proper layering */}
                <CardTitle>Practice Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="practiceName">Practice Name</Label>
                  <Input
                    id="practiceName"
                    name="practiceName"
                    value={practiceInfo.practiceName}
                    onChange={handlePracticeInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="practiceStreet">Street Address</Label>
                  <Input
                    id="practiceStreet"
                    name="practiceStreet"
                    value={practiceInfo.practiceStreet}
                    onChange={handlePracticeInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="practiceApartment">Suite/Unit (optional)</Label>
                  <Input
                    id="practiceApartment"
                    name="practiceApartment"
                    value={practiceInfo.practiceApartment}
                    onChange={handlePracticeInfoChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="practiceCity">City</Label>
                    <Input
                      id="practiceCity"
                      name="practiceCity"
                      value={practiceInfo.practiceCity}
                      onChange={handlePracticeInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="practiceState">State</Label>
                    <Select
                      value={practiceInfo.practiceState}
                      onValueChange={(value) => setPracticeInfo((prev) => ({ ...prev, practiceState: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="practiceZipCode">ZIP Code</Label>
                  <Input
                    id="practiceZipCode"
                    name="practiceZipCode"
                    value={practiceInfo.practiceZipCode}
                    onChange={handlePracticeInfoChange}
                    maxLength={5}
                    pattern="\d{5}"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="practiceWebsite">Website</Label>
                  <Input
                    id="practiceWebsite"
                    name="practiceWebsite"
                    value={practiceInfo.practiceWebsite}
                    onChange={handlePracticeInfoChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card className="relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
              <CardHeader>
                <CardTitle>Training Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {" "}
                {/* Increased spacing between cards */}
                <div>
                  {/* Medical School Information */}
                  <Card className="relative">
                    {" "}
                    {/* Added relative for strip */}
                    <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div> {/* Blue strip */}
                    <CardHeader className="relative z-10">
                      {" "}
                      {/* Added z-index */}
                      <CardTitle>Medical School</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Label htmlFor="medicalSchool">Medical School</Label>
                      <Input
                        id="medicalSchool"
                        name="medicalSchool"
                        value={personalInfo.medicalSchool}
                        onChange={handlePersonalInfoChange}
                      />
                      <Label htmlFor="medicalSchoolGraduationYear">Graduation Year</Label>
                      <Input
                        id="medicalSchoolGraduationYear"
                        name="medicalSchoolGraduationYear"
                        value={personalInfo.medicalSchoolGraduationYear}
                        onChange={handlePersonalInfoChange}
                      />
                    </CardContent>
                  </Card>

                  {/* Residency Information */}
                  <Card className="relative">
                    {" "}
                    {/* Added relative for strip */}
                    <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div> {/* Blue strip */}
                    <CardHeader className="relative z-10">
                      {" "}
                      {/* Added z-index */}
                      <CardTitle>Residency</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Label htmlFor="residency">Residency</Label>
                      <Input
                        id="residency"
                        name="residency"
                        value={personalInfo.residency}
                        onChange={handlePersonalInfoChange}
                      />
                      <Label htmlFor="residencySpecialty">Specialty</Label>
                      <Input
                        id="residencySpecialty"
                        name="residencySpecialty"
                        value={personalInfo.residencySpecialty}
                        onChange={handlePersonalInfoChange}
                      />
                      <Label htmlFor="residencyGraduationYear">Graduation Year</Label>
                      <Input
                        id="residencyGraduationYear"
                        name="residencyGraduationYear"
                        value={personalInfo.residencyGraduationYear}
                        onChange={handlePersonalInfoChange}
                      />
                    </CardContent>
                  </Card>

                  {/* Fellowship Information */}
                  <Card className="relative">
                    {" "}
                    {/* Added relative for strip */}
                    <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div> {/* Blue strip */}
                    <CardHeader className="relative z-10">
                      {" "}
                      {/* Added z-index */}
                      <CardTitle>Fellowship (Optional)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Label htmlFor="fellowship">Fellowship</Label>
                      <Input
                        id="fellowship"
                        name="fellowship"
                        value={personalInfo.fellowship}
                        onChange={handlePersonalInfoChange}
                      />
                      <Label htmlFor="fellowshipSpecialty">Specialty</Label>
                      <Input
                        id="fellowshipSpecialty"
                        name="fellowshipSpecialty"
                        value={personalInfo.fellowshipSpecialty}
                        onChange={handlePersonalInfoChange}
                      />
                      <Label htmlFor="fellowshipGraduationYear">Graduation Year</Label>
                      <Input
                        id="fellowshipGraduationYear"
                        name="fellowshipGraduationYear"
                        value={personalInfo.fellowshipGraduationYear}
                        onChange={handlePersonalInfoChange}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card className="relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" /> {/* Blue strip */}
              <CardHeader className="relative z-10">
                {" "}
                {/* Ensure z-index for proper layering */}
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordInfo.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordInfo.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordInfo.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button type="submit" style={{ backgroundColor: "#1400FF" }}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

