"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
Card,
CardContent,
CardHeader,
CardDescription,
CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"
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
import { Check, Users, X } from 'lucide-react'

interface User {
id: string;
name: string;
email: string;
role: "Broker" | "Provider" | "Employer";
}

const allUsers: User[] = [
// Mock user data - replace with actual data from your system
{ id: "1", name: "John Doe", email: "john.doe@example.com", role: "Broker" },
{ id: "2", name: "Jane Smith", email: "jane.smith@example.com", role: "Provider" },
{ id: "3", name: "Alice Johnson", email: "alice.johnson@example.com", role: "Employer" },
// ... more users
];

export function AdminMessagingCenter() {
const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
const [messageSubject, setMessageSubject] = useState("");
const [messageBody, setMessageBody] = useState("");
const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

const handleUserSelect = (user: User) => {
  setSelectedUsers(prevSelected =>
    prevSelected.some(u => u.id === user.id)
      ? prevSelected.filter(u => u.id !== user.id)
      : [...prevSelected, user]
  );
};

const handleSendMessage = () => {
  if (!selectedUsers.length) {
    toast({
      title: "No recipients selected",
      description: "Please select at least one user to send the message to.",
      variant: "destructive",
    });
    return;
  }

  if (!messageSubject || !messageBody) {
    toast({
      title: "Missing subject or body",
      description: "Please enter both a subject and a message body.",
      variant: "destructive",
    });
    return;
  }

  setIsConfirmationOpen(true);
};

const confirmSendMessage = () => {
  // Here you would typically send the message to your backend
  // For this example, we'll just log the message details
  console.log("Sending message to:", selectedUsers);
  console.log("Subject:", messageSubject);
  console.log("Body:", messageBody);

  toast({
    title: "Message sent",
    description: "Your message has been successfully sent.",
  });

  setSelectedUsers([]);
  setMessageSubject("");
  setMessageBody("");
  setIsConfirmationOpen(false);
};

return (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Messaging Center</h1>

    <Card>
      <CardHeader>
        <CardTitle>Compose Message</CardTitle>
        <CardDescription>Send messages to all users or selected groups.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recipients">Recipients</Label>
              <Select multiple value={selectedUsers.map(user => user.id)} onValueChange={(values) => setSelectedUsers(allUsers.filter(user => values.includes(user.id)))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select users" />
                </SelectTrigger>
                <SelectContent>
                  {allUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedUsers.some(u => u.id === user.id)}
                          onCheckedChange={() => handleUserSelect(user)}
                        />
                        <span>{user.name} ({user.role})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={messageSubject}
              onChange={(e) => setMessageSubject(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              className="w-full"
              rows={5}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSendMessage}>Send Message</Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Message</DialogTitle>
          <DialogDescription>
            Please review the message before sending.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="font-medium">To:</p>
          <ul className="list-disc list-inside">
            {selectedUsers.map((user) => (
              <li key={user.id}>{user.name} ({user.email})</li>
            ))}
          </ul>
          <p className="font-medium mt-2">Subject: {messageSubject}</p>
          <p className="mt-2 whitespace-pre-wrap">{messageBody}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>Cancel</Button>
          <Button onClick={confirmSendMessage}>Confirm Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
);
}

