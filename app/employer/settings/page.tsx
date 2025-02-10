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
import { employerApi } from "@/utils/employer-api-client"
import { toast } from "react-hot-toast"

export default function EmployerSettingsPage() {
  const [settings, setSettings] = useState({
    company_name: "TechCorp Inc.",
    company_size: "101-500",
    company_website: "www.techcorp.com",
    street_address: "123 Tech Street",
    suite: "Suite 400",
    city: "San Francisco",
    state: "CA",
    zip_code: "94105",
    primary_contact_name: "John Doe",
    primary_contact_email: "john.doe@techcorp.com",
    primary_contact_phone: "555-0123",
  })

  const [ein, setEin] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await employerApi.updateSettings('current', settings)
      toast.success('Settings updated successfully')
    } catch (error) {
      console.error('Error updating settings:', error)
      toast.error('Failed to update settings')
    }
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
          </TabsList>

          <TabsContent value="company">
            <Card className="relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
              <CardHeader className="relative z-10">
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    name="company_name"
                    value={settings.company_name}
                    onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company_website">Company Website</Label>
                  <Input
                    id="company_website"
                    name="company_website"
                    value={settings.company_website}
                    onChange={(e) => setSettings({ ...settings, company_website: e.target.value })}
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
                  <Label htmlFor="street_address">Street Address</Label>
                  <Input
                    id="street_address"
                    name="street_address"
                    value={settings.street_address}
                    onChange={(e) => setSettings({ ...settings, street_address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="suite">Suite/Apt (optional)</Label>
                  <Input
                    id="suite"
                    name="suite"
                    value={settings.suite}
                    onChange={(e) => setSettings({ ...settings, suite: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={settings.city}
                      onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={settings.state}
                      onValueChange={(value) => setSettings({ ...settings, state: value })}
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
                  <Label htmlFor="zip_code">ZIP Code</Label>
                  <Input
                    id="zip_code"
                    name="zip_code"
                    value={settings.zip_code}
                    onChange={(e) => setSettings({ ...settings, zip_code: e.target.value })}
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
                  <Label htmlFor="primary_contact_name">Primary Contact Name</Label>
                  <Input
                    id="primary_contact_name"
                    name="primary_contact_name"
                    value={settings.primary_contact_name}
                    onChange={(e) => setSettings({ ...settings, primary_contact_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary_contact_email">Primary Contact Email</Label>
                  <Input
                    id="primary_contact_email"
                    name="primary_contact_email"
                    type="email"
                    value={settings.primary_contact_email}
                    onChange={(e) => setSettings({ ...settings, primary_contact_email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary_contact_phone">Primary Contact Phone</Label>
                  <Input
                    id="primary_contact_phone"
                    name="primary_contact_phone"
                    value={settings.primary_contact_phone}
                    onChange={(e) => setSettings({ ...settings, primary_contact_phone: e.target.value })}
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

