"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface Provider {
  id: string
  name: string
  specialty: string
  location: string
  contactEmail: string
  contactPhone: string
}

export function ProviderDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "1",
      name: "Dr. Jane Smith",
      specialty: "Family Medicine",
      location: "New York, NY",
      contactEmail: "jane.smith@example.com",
      contactPhone: "(555) 123-4567"
    },
    {
      id: "2",
      name: "Dr. John Doe",
      specialty: "Internal Medicine",
      location: "Los Angeles, CA",
      contactEmail: "john.doe@example.com",
      contactPhone: "(555) 987-6543"
    },
    {
      id: "3",
      name: "Dr. Emily Brown",
      specialty: "Pediatrics",
      location: "Chicago, IL",
      contactEmail: "emily.brown@example.com",
      contactPhone: "(555) 246-8135"
    }
  ])

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-grow mr-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredProviders.map((provider) => (
        <Card key={provider.id} className="w-full">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex-grow">
              <h3 className="text-xl font-semibold">{provider.name}</h3>
              <p className="text-gray-600">Specialty: {provider.specialty}</p>
              <p className="text-gray-600">Location: {provider.location}</p>
              <p className="text-gray-600">Email: {provider.contactEmail}</p>
              <p className="text-gray-600">Phone: {provider.contactPhone}</p>
            </div>
            <div className="flex items-center justify-end w-1/4">
              <Button>Contact Provider</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

