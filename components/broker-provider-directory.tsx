import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search } from 'lucide-react'

interface DirectoryEntry {
  id: string
  name: string
  type: "Broker" | "Provider"
  specialty?: string
  location: string
  contact: string
  imageUrl: string
}

const initialDirectory: DirectoryEntry[] = [
  {
    id: "1",
    name: "Dr. Jane Smith",
    type: "Provider",
    specialty: "Family Medicine",
    location: "New York, NY",
    contact: "jane.smith@example.com",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "John Doe",
    type: "Broker",
    location: "Los Angeles, CA",
    contact: "john.doe@example.com",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Dr. Michael Johnson",
    type: "Provider",
    specialty: "Pediatrics",
    location: "Chicago, IL",
    contact: "michael.johnson@example.com",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Sarah Brown",
    type: "Broker",
    location: "Houston, TX",
    contact: "sarah.brown@example.com",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
]

export function BrokerProviderDirectory() {
  const [directory, setDirectory] = useState<DirectoryEntry[]>(initialDirectory)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDirectory = directory.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (entry.specialty && entry.specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
    entry.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Broker and Provider Directory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center space-x-2">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search by name, type, specialty, or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDirectory.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-4 flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={entry.imageUrl} alt={entry.name} />
                  <AvatarFallback>{entry.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h3 className="font-semibold">{entry.name}</h3>
                  <Badge variant={entry.type === "Broker" ? "secondary" : "default"}>
                    {entry.type}
                  </Badge>
                  {entry.specialty && <p className="text-sm text-gray-500">{entry.specialty}</p>}
                  <p className="text-sm">{entry.location}</p>
                  <Button variant="link" className="p-0 h-auto">
                    {entry.contact}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

