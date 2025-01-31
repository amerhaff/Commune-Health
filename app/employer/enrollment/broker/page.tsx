"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowLeft, Search, Mail, Phone, MapPin, MessageSquare, Globe } from 'lucide-react'
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
import Image from "next/image"

interface Broker {
  id: string
  name: string
  company: string
  email: string
  phone: string
  address: string
  website: string
}

const brokers: Broker[] = [
  { 
    id: "1", 
    name: "John Doe", 
    company: "ABC Insurance", 
    email: "john.doe@abcinsurance.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    website: "www.abcinsurance.com"
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    company: "XYZ Benefits", 
    email: "jane.smith@xyzbenefits.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Somewhere, USA 67890",
    website: "www.xyzbenefits.com"
  },
  { 
    id: "3", 
    name: "Mike Johnson", 
    company: "123 Consulting", 
    email: "mike.johnson@123consulting.com",
    phone: "(555) 246-8135",
    address: "789 Pine Rd, Elsewhere, USA 13579",
    website: "www.123consulting.com"
  },
  { 
    id: "4", 
    name: "Sarah Brown", 
    company: "Acme Insurance", 
    email: "sarah.brown@acmeinsurance.com",
    phone: "(555) 369-2580",
    address: "321 Elm St, Nowhere, USA 24680",
    website: "www.acmeinsurance.com"
  },
]

export default function BrokerEnrollmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null)
  const [message, setMessage] = useState("")

  const filteredBrokers = brokers.filter(broker => 
    broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    broker.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (selectedBroker) {
      console.log(`Sending message to ${selectedBroker.name}: ${message}`)
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${selectedBroker.name}.`,
      })
      setMessage("")
      setSelectedBroker(null)
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
        <h1 className="text-3xl font-bold">Enroll through Broker</h1>
        <Button asChild variant="outline" className="flex items-center space-x-2">
          <Link href="/employer/enrollment">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <Card className="relative mb-6">
        <CardHeader>
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
          <CardTitle>Find a Broker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search brokers by name or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredBrokers.map(broker => (
          <Card key={broker.id} className="relative">
            <CardContent className="relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
              <div className="flex items-center justify-between p-6">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{broker.company}</CardTitle>
                  <CardDescription className="text-lg">{broker.name}</CardDescription>
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      {broker.email}
                    </p>
                    <p className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      {broker.phone}
                    </p>
                    <p className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      {broker.address}
                    </p>
                    <p className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      <a href={`https://${broker.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {broker.website}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button
                    className="w-full"
                    asChild
                  >
                    <Link href={`/employer/enrollment/broker/${broker.id}/submit-roster`}>
                      Select Broker
                    </Link>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedBroker(broker)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Send Message to {selectedBroker?.name}</DialogTitle>
                        <DialogDescription>
                          Type your message below. The broker will receive it via email.
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

