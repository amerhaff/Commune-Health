"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, Mail, Phone, MapPin, Globe, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface MembershipTier {
  name: string
  price: number
  description: string
}

interface Education {
  degree: string
  institution: string
  graduationYear: number
  specialty?: string
}

interface Provider {
  id: string
  name: string
  specialty: string
  practiceName: string
  location: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  education: {
    medicalSchool: Education
    residency: Education
    fellowship?: Education
  }
  yearsOfExperience: number
  membershipTiers: MembershipTier[]
}

export default function BrokerProviderDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [message, setMessage] = useState("")

  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "1",
      name: "Dr. Jane Smith",
      specialty: "Family Medicine",
      practiceName: "HealthFirst Clinic",
      location: "New York, NY",
      email: "jane.smith@healthfirst.com",
      phone: "(555) 123-4567",
      website: "www.healthfirstclinic.com",
      address: {
        street: "123 Health Ave",
        city: "New York",
        state: "NY",
        zipCode: "10001"
      },
      education: {
        medicalSchool: {
          degree: "MD",
          institution: "Harvard Medical School",
          graduationYear: 2005,
        },
        residency: {
          degree: "Residency",
          institution: "Massachusetts General Hospital",
          graduationYear: 2008,
          specialty: "Family Medicine",
        },
      },
      yearsOfExperience: 15,
      membershipTiers: [
        { name: "Basic", price: 50, description: "Annual check-up and basic care" },
        { name: "Standard", price: 100, description: "Includes specialist referrals and priority scheduling" },
        { name: "Premium", price: 200, description: "24/7 access, home visits, and comprehensive care" }
      ]
    },
    {
      id: "2",
      name: "Dr. John Doe",
      specialty: "Internal Medicine",
      practiceName: "City Health Center",
      location: "Los Angeles, CA",
      email: "john.doe@cityhealth.com",
      phone: "(555) 987-6543",
      website: "www.cityhealthcenter.com",
      address: {
        street: "456 Medical Blvd",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001"
      },
      education: {
        medicalSchool: {
          degree: "MD",
          institution: "Stanford University School of Medicine",
          graduationYear: 2000,
        },
        residency: {
          degree: "Residency",
          institution: "UCLA Medical Center",
          graduationYear: 2003,
          specialty: "Internal Medicine",
        },
        fellowship: {
          degree: "Fellowship",
          institution: "Johns Hopkins Hospital",
          graduationYear: 2005,
          specialty: "Cardiology",
        },
      },
      yearsOfExperience: 20,
      membershipTiers: [
        { name: "Basic", price: 75, description: "Regular check-ups and basic care" },
        { name: "Premium", price: 150, description: "Includes specialist care and 24/7 access" }
      ]
    },
    {
      id: "3",
      name: "Dr. Emily Brown",
      specialty: "Pediatrics",
      practiceName: "Kids Care Clinic",
      location: "Chicago, IL",
      email: "emily.brown@kidscare.com",
      phone: "(555) 246-8135",
      website: "www.kidscareclinic.com",
      address: {
        street: "789 Child St",
        city: "Chicago",
        state: "IL",
        zipCode: "60601"
      },
      education: {
        medicalSchool: {
          degree: "MD",
          institution: "University of Chicago Pritzker School of Medicine",
          graduationYear: 2010,
        },
        residency: {
          degree: "Residency",
          institution: "Ann & Robert H. Lurie Children's Hospital of Chicago",
          graduationYear: 2013,
          specialty: "Pediatrics",
        },
      },
      yearsOfExperience: 10,
      membershipTiers: [
        { name: "Child Basic", price: 60, description: "Regular check-ups and vaccinations" },
        { name: "Child Plus", price: 120, description: "Includes specialist referrals and 24/7 nurse hotline" }
      ]
    }
  ])

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.practiceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleProviderExpansion = (providerId: string) => {
    setExpandedProvider(expandedProvider === providerId ? null : providerId)
  }

  const handleSendMessage = () => {
    if (selectedProvider && message.trim()) {
      // Here you would typically send the message to your backend
      console.log(`Sending message to ${selectedProvider.name}: ${message}`)
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${selectedProvider.name}.`,
      })
      setMessage("")
      setSelectedProvider(null)
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
          <Button
            onClick={() => {
              window.location.href = '/'
            }}
            className="rounded-full"
            style={{ backgroundColor: '#1400FF' }}
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Provider Directory</h1>
        <Button asChild variant="outline">
          <Link href="/broker/home">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="mb-6 relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
        <CardHeader>
          <CardTitle>Find a Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search providers by name, specialty, practice, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredProviders.map((provider) => (
          <Card key={provider.id} className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="space-y-2 flex-grow">
                  <h2 className="text-3xl font-bold">{provider.practiceName}</h2>
                  <h3 className="text-xl">{provider.name}</h3>
                  <p className="text-gray-600">{provider.specialty}</p>
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      {provider.address.street}, {provider.address.city}, {provider.address.state} {provider.address.zipCode}
                    </p>
                    <p className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      {provider.email}
                    </p>
                    <p className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      {provider.phone}
                    </p>
                    <p className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      <a href={`https://${provider.website}`} target="_blank" rel="noopener noreferrer">{provider.website}</a>
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleProviderExpansion(provider.id)}
                    className="mt-2"
                  >
                    {expandedProvider === provider.id ? (
                      <>
                        Less Info <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        More Info <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <div className="mt-4 md:mt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedProvider(provider)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send Message to {provider.name}</DialogTitle>
                      </DialogHeader>
                      <Textarea
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                      />
                      <DialogFooter>
                        <Button onClick={handleSendMessage}>Send Message</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              {expandedProvider === provider.id && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Education and Experience</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Medical School:</strong> {provider.education.medicalSchool.institution} ({provider.education.medicalSchool.graduationYear})</p>
                        <p><strong>Residency:</strong> {provider.education.residency.institution} ({provider.education.residency.graduationYear}) - {provider.education.residency.specialty}</p>
                        {provider.education.fellowship && (
                          <p><strong>Fellowship:</strong> {provider.education.fellowship.institution} ({provider.education.fellowship.graduationYear}) - {provider.education.fellowship.specialty}</p>
                        )}
                        <p><strong>Years of Experience:</strong> {provider.yearsOfExperience}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Membership Tiers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {provider.membershipTiers.map((tier, index) => (
                        <div key={index} className="border rounded p-3">
                          <h5 className="font-semibold">{tier.name}</h5>
                          <p className="text-sm text-gray-600">{tier.description}</p>
                          <p className="text-sm font-medium mt-1">${tier.price}/month</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

