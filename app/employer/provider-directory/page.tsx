"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowLeft, Mail, Phone, MapPin, Globe, MessageSquare, ChevronDown, ChevronUp, GraduationCap, Clock, DollarSign } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
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
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  website: string
  imageUrl: string
  education: {
    medicalSchool: Education
    residency: Education
    fellowship?: Education
  }
  yearsOfExperience: number
  membershipTiers: MembershipTier[]
  isExpanded: boolean
}

export default function ProviderDirectoryPage() {
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "1",
      name: "Dr. Jane Smith",
      specialty: "Family Medicine",
      practiceName: "HealthFirst Clinic",
      email: "jane.smith@example.com",
      phone: "(555) 123-4567",
      address: {
        street: "789 Health Ave",
        city: "New York",
        state: "NY",
        zipCode: "10001"
      },
      website: "www.healthfirstclinic.com",
      imageUrl: "/placeholder.svg?height=100&width=100",
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
      ],
      isExpanded: false
    },
    {
      id: "2",
      name: "Dr. Michael Johnson",
      specialty: "Pediatrics",
      practiceName: "Kids Care Center",
      email: "michael.johnson@example.com",
      phone: "(555) 987-6543",
      address: {
        street: "456 Child St",
        city: "Chicago",
        state: "IL",
        zipCode: "60601"
      },
      website: "www.kidscarecenter.com",
      imageUrl: "/placeholder.svg?height=100&width=100",
      education: {
        medicalSchool: {
          degree: "MD",
          institution: "Johns Hopkins School of Medicine",
          graduationYear: 2000,
        },
        residency: {
          degree: "Residency",
          institution: "Children's Hospital of Philadelphia",
          graduationYear: 2003,
          specialty: "Pediatrics",
        },
        fellowship: {
          degree: "Fellowship",
          institution: "Boston Children's Hospital",
          graduationYear: 2005,
          specialty: "Pediatric Cardiology",
        },
      },
      yearsOfExperience: 20,
      membershipTiers: [
        { name: "Child Basic", price: 75, description: "Regular check-ups and vaccinations" },
        { name: "Child Plus", price: 150, description: "Includes specialist care and 24/7 nurse hotline" }
      ],
      isExpanded: false
    },
    {
      id: "3",
      name: "Dr. Emily Brown",
      specialty: "Cardiology",
      practiceName: "Heart Health Institute",
      email: "emily.brown@example.com",
      phone: "(555) 246-8135",
      address: {
        street: "123 Cardio Ln",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001"
      },
      website: "www.hearthealthinstitute.com",
      imageUrl: "/placeholder.svg?height=100&width=100",
      education: {
        medicalSchool: {
          degree: "MD",
          institution: "Stanford University School of Medicine",
          graduationYear: 2002,
        },
        residency: {
          degree: "Residency",
          institution: "UCLA Medical Center",
          graduationYear: 2005,
          specialty: "Internal Medicine",
        },
        fellowship: {
          degree: "Fellowship",
          institution: "Cleveland Clinic",
          graduationYear: 2007,
          specialty: "Interventional Cardiology",
        },
      },
      yearsOfExperience: 18,
      membershipTiers: [
        { name: "Heart Basic", price: 100, description: "Regular heart check-ups and consultations" },
        { name: "Heart Plus", price: 200, description: "Includes advanced diagnostics and priority care" }
      ],
      isExpanded: false
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [message, setMessage] = useState("")

  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.practiceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.address.state.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (selectedProvider) {
      console.log(`Sending message to ${selectedProvider.name}: ${message}`)
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${selectedProvider.name}.`,
      })
      setMessage("")
      setSelectedProvider(null)
    }
  }

  const toggleProviderExpansion = (providerId: string) => {
    setProviders(providers.map(provider =>
      provider.id === providerId
        ? { ...provider, isExpanded: !provider.isExpanded }
        : provider
    ))
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
          <Link href="/employer/home">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
        <CardHeader>
          <CardTitle>Find a Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search by name, specialty, practice, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="space-y-4">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="relative">
                <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="space-y-2 flex-grow">
                      <h2 className="text-3xl font-bold">{provider.practiceName}</h2>
                      <h3 className="text-xl">{provider.name}</h3>
                      <Badge variant="secondary" className="mb-2">
                        {provider.specialty}
                      </Badge>
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleProviderExpansion(provider.id)}
                          className="mt-2"
                        >
                          {provider.isExpanded ? (
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
                    </div>
                    <div className="ml-4 flex items-center h-full">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedProvider(provider)}
                            className="bg-black text-white hover:bg-gray-800"
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Send Message to {selectedProvider?.name}</DialogTitle>
                            <DialogDescription>
                              Type your message below. The provider will receive it via email.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <Textarea
                              placeholder="Type your message here..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={5}
                            />
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button onClick={handleSendMessage} disabled={!message.trim()}>
                              Send Message
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  {provider.isExpanded && (
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
        </CardContent>
      </Card>
    </div>
  )
}

