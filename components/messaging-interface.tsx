"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
}

interface Contact {
  id: string
  name: string
  role: "Broker" | "Primary Care Provider"
  avatar: string
}

export function MessagingInterface() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  const contacts: Contact[] = [
    { id: "1", name: "John Doe", role: "Broker", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Dr. Jane Smith", role: "Primary Care Provider", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "3", name: "Mike Johnson", role: "Broker", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const handleSendMessage = () => {
    if (message.trim() && selectedContact) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "You",
        content: message,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate a response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          sender: selectedContact.name,
          content: `Thank you for your message. How can I assist you today?`,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, response])
      }, 1000)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Messaging</CardTitle>
      </CardHeader>
      <CardContent className="flex h-[600px]">
        <div className="w-1/3 border-r pr-4">
          <Select onValueChange={(value) => setSelectedContact(contacts.find(c => c.id === value) || null)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a contact" />
            </SelectTrigger>
            <SelectContent>
              {contacts.map((contact) => (
                <SelectItem key={contact.id} value={contact.id}>
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    {contact.name} ({contact.role})
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-2/3 pl-4 flex flex-col">
          {selectedContact ? (
            <>
              <ScrollArea className="flex-grow mb-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`mb-2 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
                    <div className={`inline-block bg-gray-100 rounded-lg px-3 py-2 ${msg.sender === "You" ? "bg-blue-100" : ""}`}>
                      <p className="font-semibold">{msg.sender}</p>
                      <p>{msg.content}</p>
                      <p className="text-xs text-gray-500">{msg.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow mr-2"
                />
                <Button onClick={handleSendMessage}>Send</Button>
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
  )
}

