"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ArrowLeft, Mail, Phone, MapPin, MessageSquare, Globe } from 'lucide-react'
import Link from "next/link"
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
  businessName: string
  email: string
  phone: string
  address: string
  website: string
  imageUrl: string
}

const initialBrokers: Broker[] = [
  {
    id: "1",
    name: "John Doe",
    businessName: "Doe Insurance Solutions",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Los Angeles, CA 90001",
    website: "www.doeinsurance.com",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Sarah Brown",
    businessName: "Brown Benefits Group",
    email: "sarah.brown@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Houston, TX 77001",
    website: "www.brownbenefits.com",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Michael Johnson",
    businessName: "Johnson Insurance Associates",
    email: "michael.johnson@example.com",
    phone: "(555) 246-8135",
    address: "789 Broadway, New York, NY 10001",
    website: "www.johnsoninsurance.com",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Emily Davis",
    businessName: "Davis Benefits Consulting",
    email: "emily.davis@example.com",
    phone: "(555) 369-2580",
    address: "321 Pine St, Chicago, IL 60601",
    website: "www.davisbenefits.com",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
]

export default function BrokerDirectoryPage() {
  const [brokers, setBrokers] = useState<Broker[]>(initialBrokers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null)
  const [message, setMessage] = useState("")

  const filteredBrokers = brokers.filter((broker) =>
    broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    broker.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    broker.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (selectedBroker) {
      // Here you would typically send the message to your backend
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
        <h1 className="text-3xl font-bold">Broker Directory</h1>
        <Button asChild variant="outline">
          <Link href="/employer/home">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="relative">
        <CardHeader>
          <CardTitle>Find a Broker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search by name, business, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
          <div className="space-y-4">
            {filteredBrokers.map((broker) => (
              <Card key={broker.id} className="relative">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{broker.businessName}</CardTitle>
                    <CardDescription className="text-lg font-semibold">{broker.name}</CardDescription>
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
                  <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
                  <div className="flex flex-col space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="default" 
                          onClick={() => setSelectedBroker(broker)}
                          style={{ backgroundColor: 'black', color: 'white' }}
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
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

