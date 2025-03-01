"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { ArrowLeft, Building2, Mail, Lock, User, Upload } from "lucide-react"
import { usStates } from "@/utils/us-states"
import Image from "next/image"
import cn from "classnames"

export default function BrokerSettingsPage() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "555-0123",
    npnNumber: "1234567890",
  })

  const [businessInfo, setBusinessInfo] = useState({
    businessName: "Doe Insurance Brokerage",
    businessStreet: "123 Main St",
    businessApartment: "Suite 100",
    businessCity: "Anytown",
    businessState: "CA",
    businessZipCode: "12345",
    businessWebsite: "www.doeinsurance.com",
  })

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value })
  }

  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessInfo({ ...businessInfo, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated info to your backend
    console.log("Updated info:", { personalInfo, businessInfo })
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
            <Button asChild variant="outline">
              <Link href="/broker/home">
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

      <h1 className="text-3xl font-bold mb-6">Broker Settings</h1>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
              Personal Information
            </TabsTrigger>
            <TabsTrigger value="business" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
              Business Information
            </TabsTrigger>
            <TabsTrigger value="password" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
              Change Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
              <CardHeader>
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
                  <Label htmlFor="npnNumber">NPN Number</Label>
                  <Input
                    id="npnNumber"
                    name="npnNumber"
                    value={personalInfo.npnNumber}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business">
            <Card className="relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={businessInfo.businessName}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessStreet">Street Address</Label>
                  <Input
                    id="businessStreet"
                    name="businessStreet"
                    value={businessInfo.businessStreet}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessApartment">Apartment, suite, etc. (optional)</Label>
                  <Input
                    id="businessApartment"
                    name="businessApartment"
                    value={businessInfo.businessApartment}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessCity">City</Label>
                    <Input
                      id="businessCity"
                      name="businessCity"
                      value={businessInfo.businessCity}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessState">State</Label>
                    <Select
                      value={businessInfo.businessState}
                      onValueChange={(value) => setBusinessInfo((prev) => ({ ...prev, businessState: value }))}
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
                  <Label htmlFor="businessZipCode">ZIP Code</Label>
                  <Input
                    id="businessZipCode"
                    name="businessZipCode"
                    value={businessInfo.businessZipCode}
                    onChange={handleBusinessInfoChange}
                    maxLength={5}
                    pattern="\d{5}"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessWebsite">Website</Label>
                  <Input
                    id="businessWebsite"
                    name="businessWebsite"
                    value={businessInfo.businessWebsite}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card className="relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
              <CardHeader>
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

