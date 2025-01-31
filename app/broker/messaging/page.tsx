"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Mail, Phone, MapPin, Send, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

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
role: "Client" | "Provider"
avatar: string
email: string
phone: string
location: string
company?: string
specialty?: string
lastMessage?: Message
}

export default function BrokerMessagingPage() {
const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
const [message, setMessage] = useState("")
const [messages, setMessages] = useState<Message[]>([])
const [searchTerm, setSearchTerm] = useState("")

const contacts: Contact[] = [
  { 
    id: "1", 
    name: "Acme Corp", 
    role: "Client", 
    avatar: "/placeholder.svg?height=40&width=40",
    email: "contact@acmecorp.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    company: "Acme Corporation",
    lastMessage: {
      id: "m1",
      sender: "Acme Corp",
      content: "We need to discuss our new employee benefits package.",
      timestamp: new Date(2023, 5, 15, 10, 30),
      seen: false
    }
  },
  { 
    id: "2", 
    name: "Dr. Jane Smith", 
    role: "Provider", 
    avatar: "/placeholder.svg?height=40&width=40",
    email: "jane.smith@healthclinic.com",
    phone: "(555) 987-6543",
    location: "Los Angeles, CA",
    specialty: "Family Medicine",
    lastMessage: {
      id: "m2",
      sender: "Dr. Jane Smith",
      content: "Can we review the new direct primary care options?",
      timestamp: new Date(2023, 5, 16, 14, 45),
      seen: true
    }
  },
  { 
    id: "3", 
    name: "TechStart Inc", 
    role: "Client", 
    avatar: "/placeholder.svg?height=40&width=40",
    email: "hr@techstart.com",
    phone: "(555) 246-8135",
    location: "San Francisco, CA",
    company: "TechStart Inc",
    lastMessage: {
      id: "m3",
      sender: "You",
      content: "I've sent over the updated proposal for your review.",
      timestamp: new Date(2023, 5, 17, 9, 15),
      seen: true
    }
  },
]

const handleSendMessage = () => {
  if (message.trim() && selectedContact) {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: message,
      timestamp: new Date(),
      seen: true
    }
    setMessages(prev => [...prev, newMessage])
    setMessage("")

    // Simulate a response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: selectedContact.name,
        content: `Thank you for your message. I'll get back to you shortly.`,
        timestamp: new Date(),
        seen: false
      }
      setMessages(prev => [...prev, response])
    }, 1000)
  }
}

useEffect(() => {
  if (selectedContact && selectedContact.lastMessage) {
    setMessages([selectedContact.lastMessage])
  } else {
    setMessages([])
  }
}, [selectedContact])

const filteredContacts = contacts.filter(contact => 
  contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (contact.specialty && contact.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
)

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
      <h1 className="text-3xl font-bold">Messaging</h1>
      <Button asChild variant="outline">
        <Link href="/broker/home">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
      </Button>
    </div>

    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Contact and Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[600px]">
          <div className="w-1/3 border-r pr-4">
            <div className="mb-4 flex items-center">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
            </div>
            <ScrollArea className="h-[520px]">
              {filteredContacts.map((contact) => (
                <Button
                  key={contact.id}
                  variant="ghost"
                  className="w-full justify-start mb-2 p-2 h-auto relative"
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start w-full">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{contact.name}</span>
                        {contact.lastMessage && !contact.lastMessage.seen && (
                          <span className="flex">
                            <span className="sr-only">New message</span>
                            <div className={cn(
                              "h-2 w-2 rounded-full bg-red-500",
                              "animate-pulse"
                            )} />
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {contact.role === "Client" ? contact.company : contact.specialty}
                      </p>
                      {contact.lastMessage && (
                        <p className="text-sm truncate text-gray-600">{contact.lastMessage.content}</p>
                      )}
                    </div>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </div>
          <div className="w-2/3 pl-4 flex flex-col">
            {selectedContact ? (
              <>
                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <h2 className="text-xl font-semibold">{selectedContact.name}</h2>
                  <p className="text-sm text-gray-500">{selectedContact.role}</p>
                  <div className="mt-2 text-sm">
                    <p className="flex items-center"><Mail className="mr-2 h-4 w-4" /> {selectedContact.email}</p>
                    <p className="flex items-center"><Phone className="mr-2 h-4 w-4" /> {selectedContact.phone}</p>
                    <p className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> {selectedContact.location}</p>
                    {selectedContact.role === "Client" && (
                      <p className="mt-1">Company: {selectedContact.company}</p>
                    )}
                    {selectedContact.role === "Provider" && (
                      <p className="mt-1">Specialty: {selectedContact.specialty}</p>
                    )}
                  </div>
                </div>
                <ScrollArea className="flex-grow mb-4 pr-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`mb-4 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
                      <div className={`inline-block max-w-[70%] rounded-lg px-4 py-2 ${msg.sender === "You" ? "bg-blue-200" : "bg-blue-100"}`}>
                        <p className="font-semibold">{msg.sender}</p>
                        <p className="text-gray-800">{msg.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {msg.timestamp.toLocaleDateString()} {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex items-center">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow mr-2 resize-none"
                    rows={2}
                  />
                  <Button onClick={handleSendMessage} className="h-full">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a contact to start messaging</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
)
}

