"use client"

import { useState } from "react"
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

export default function EmployerSettingsPage() {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "TechCorp Inc.",
    companySize: "101-500",
    companyWebsite: "www.techcorp.com",
  })

  const [addressInfo, setAddressInfo] = useState({
    street: "123 Tech Street",
    suite: "Suite 400",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
  })

  const [contactInfo, setContactInfo] = useState({
    primaryContactName: "John Doe",
    primaryContactEmail: "john.doe@techcorp.com",
    primaryContactPhone: "555-0123",
  })

  const [passwordInfo, setPasswordInfo] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  const [ein, setEin] = useState("")

  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value })
  }

  const handleAddressInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value })
  }

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated info to your backend
    console.log("Updated info:", { companyInfo, addressInfo, contactInfo, ein }) // Include ein
  }

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
              <Link href="/employer/home">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
            <Button
              onClick={() => {
                // Here you would typically implement logout functionality
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

      <h1 className="text-3xl font-bold mb-6">Employer Settings</h1>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="company" className="space-y-4">
          <TabsList>
            <TabsTrigger value="company" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
              Company Information
            </TabsTrigger>
            <TabsTrigger value="contact" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
              Contact Information
            </TabsTrigger>
            <TabsTrigger value="password" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
              Change Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card className="relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
              <CardHeader className="relative z-10">
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={companyInfo.companyName}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input
                    id="companyWebsite"
                    name="companyWebsite"
                    value={companyInfo.companyWebsite}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ein">Employer Identification Number (EIN)</Label>
                  <Input
                    id="ein"
                    name="ein"
                    value={ein}
                    onChange={(e) => setEin(e.target.value)}
                    maxLength={10}
                    pattern="\d{2}-\d{7}"
                    placeholder="XX-XXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" name="street" value={addressInfo.street} onChange={handleAddressInfoChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="suite">Suite/Apt (optional)</Label>
                  <Input id="suite" name="suite" value={addressInfo.suite} onChange={handleAddressInfoChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={addressInfo.city} onChange={handleAddressInfoChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={addressInfo.state}
                      onValueChange={(value) => setAddressInfo((prev) => ({ ...prev, state: value }))}
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
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={addressInfo.zipCode}
                    onChange={handleAddressInfoChange}
                    maxLength={5}
                    pattern="\d{5}"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
              <CardHeader className="relative z-10">
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryContactName">Primary Contact Name</Label>
                  <Input
                    id="primaryContactName"
                    name="primaryContactName"
                    value={contactInfo.primaryContactName}
                    onChange={handleContactInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryContactEmail">Primary Contact Email</Label>
                  <Input
                    id="primaryContactEmail"
                    name="primaryContactEmail"
                    type="email"
                    value={contactInfo.primaryContactEmail}
                    onChange={handleContactInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryContactPhone">Primary Contact Phone</Label>
                  <Input
                    id="primaryContactPhone"
                    name="primaryContactPhone"
                    value={contactInfo.primaryContactPhone}
                    onChange={handleContactInfoChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card className="relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
              <CardHeader className="relative z-10">
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

