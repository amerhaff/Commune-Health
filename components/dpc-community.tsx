"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, User } from 'lucide-react'

interface Doctor {
  id: string
  name: string
  specialty: string
  location: string
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
}

export function DPCCommunity({ onClose }: { onClose: () => void }) {
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: "1", name: "Dr. Jane Smith", specialty: "Family Medicine", location: "New York, NY" },
    { id: "2", name: "Dr. John Doe", specialty: "Internal Medicine", location: "Los Angeles, CA" },
    { id: "3", name: "Dr. Emily Brown", specialty: "Pediatrics", location: "Chicago, IL" },
  ])

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate a response from the doctor
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: selectedDoctor?.name || "Doctor",
        content: "Thank you for your message. How can I assist you today?",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, response])
    }, 1000)
  }

  return (
    <Card className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Direct Primary Care Community</CardTitle>
        <Button variant="ghost" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <div className="w-1/3 border-r pr-4">
            <h3 className="text-lg font-semibold mb-4">DPC Providers</h3>
            <ScrollArea className="h-[calc(100vh-250px)]">
              {doctors.map(doctor => (
                <Button
                  key={doctor.id}
                  variant="ghost"
                  className="w-full justify-start mb-2"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <User className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <div>{doctor.name}</div>
                    <div className="text-sm text-gray-500">{doctor.specialty}</div>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </div>
          <div className="w-2/3 pl-4 flex flex-col">
            {selectedDoctor ? (
              <>
                <h3 className="text-lg font-semibold mb-4">Chat with {selectedDoctor.name}</h3>
                <ScrollArea className="flex-1 mb-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`mb-2 ${
                        message.sender === "You" ? "text-right" : "text-left"
                      }`}
                    >
                      <span className="inline-block bg-gray-100 rounded-lg px-3 py-2">
                        <strong>{message.sender}:</strong> {message.content}
                      </span>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex">
                  <Input
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 mr-2"
                    onKeyPress={e => {
                      if (e.key === "Enter") handleSendMessage()
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a doctor to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

