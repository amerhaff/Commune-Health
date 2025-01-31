"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Mail, Phone, MapPin, Send, Search, ArrowLeft, User, Briefcase, Stethoscope, MessageSquare, Globe } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  seen: boolean
}

interface Contact {
  id: string
  name: string
  role: "Broker" | "Provider" | "Employer"
  avatar: string
  email: string
  phone: string
  location: string
  company?: string
  specialty?: string
  practiceName?: string
  lastMessage?: Message
}

export default function AdminMessagingCenterPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [activeTab, setActiveTab] = useState<"messages" | "directory">("directory")
  const [directorySubTab, setDirectorySubTab] = useState<"brokers" | "providers" | "employers">("brokers")
  const [searchTerm, setSearchTerm] = useState("")

  const contacts: Contact[] = [
    {
      id: "1",
      name: "John Doe",
      role: "Broker",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      location: "New York, NY",
      company: "ABC Insurance",
    },
    {
      id: "2",
      name: "Dr. Jane Smith",
      role: "Provider",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "jane.smith@example.com",
      phone: "(555) 987-6543",
      location: "Los Angeles, CA",
      specialty: "Family Medicine",
      practiceName: "Smith Family Clinic",
    },
    {
      id: "3",
      name: "TechCorp Inc.",
      role: "Employer",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "hr@techcorp.com",
      phone: "(555) 246-8135",
      location: "San Francisco, CA",
      company: "TechCorp Inc.",
    },
  ]

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredContacts = contacts.filter((contact) => {
    const searchFields = [contact.name, contact.email, contact.company || "", contact.specialty || "", contact.practiceName || ""]
    return (
      searchFields.some((field) => field.toLowerCase().includes(searchTerm.toLowerCase())) &&
      contact.role.toLowerCase() === directorySubTab
    )
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="border-b mb-8">
        <div className="flex h-16 items-center justify-between">
          <Link className="flex items-center" href="/">
            <Image src="/Simpliwell_logo.png" alt="Simpliwell" width={150} height={40} priority />
          </Link>
          <Button
            onClick={() => window.location.href = "/"}
            className="rounded-full"
            style={{ backgroundColor: '#1400FF' }}
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Messaging Center</h1>
        <Button 
          asChild
          className="bg-white text-black hover:bg-gray-100 shadow-sm rounded-full"
        >
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="w-full mx-auto relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
        <CardHeader>
          <CardTitle>{activeTab === "directory" ? "User Directory" : "Messages"}</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[600px]">
          <div className="w-1/3 border-r pr-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="messages" className="data-[state=active]:bg-black data-[state=active]:text-white">Messages</TabsTrigger>
                <TabsTrigger value="directory" className="data-[state=active]:bg-black data-[state=active]:text-white">Directory</TabsTrigger>
              </TabsList>
              <TabsContent value="directory">
                <Tabs value={directorySubTab} onValueChange={setDirectorySubTab}>
                  <TabsList>
                    <TabsTrigger value="brokers" className="data-[state=active]:bg-black data-[state=active]:text-white">Brokers</TabsTrigger>
                    <TabsTrigger value="providers" className="data-[state=active]:bg-black data-[state=active]:text-white">Providers</TabsTrigger>
                    <TabsTrigger value="employers" className="data-[state=active]:bg-black data-[state=active]:text-white">Employers</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Input
                  placeholder="Search directory..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="my-4"
                />
                <ScrollArea className="h-[480px]">
                  {filteredContacts.map((contact) => (
                    <Card key={contact.id} className="mb-4">
                      <CardContent className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>{contact.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{contact.company || contact.practiceName || contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.location}</p>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                          <p className="text-sm text-gray-600">{contact.phone}</p>
                          <Button variant="link" className="mt-2" onClick={() => setSelectedContact(contact)}>
                            <MessageSquare className="mr-2 h-4 w-4" /> Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
          <div className="w-2/3 pl-4 flex flex-col">
            {selectedContact ? (
              <div>
                {/* Message thread would go here */}
                <p>Message Thread for {selectedContact.name}</p>
                <Textarea placeholder="Type your message here..." />
                <Button>Send</Button>
              </div>
            ) : activeTab === "messages" ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a contact to start messaging</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 w-full">
                {filteredContacts.map((contact) => (
                  <Card key={contact.id} className="w-full max-w-sm mb-4 shadow-md">
                    <CardContent className="p-4 flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                        <Badge variant={contact.role === "Broker" ? "secondary" : "default"}>
                          {contact.role}
                        </Badge>
                        {contact.specialty && <p className="text-sm text-gray-500">{contact.specialty}</p>}
                        <p className="text-sm">{contact.location}</p>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                        <p className="text-sm text-gray-500">{contact.phone}</p>
                        <Button
                          onClick={() => setSelectedContact(contact)}
                          className="w-full mt-2 hover:bg-gray-100"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

