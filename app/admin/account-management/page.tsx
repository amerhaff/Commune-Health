'use client'

import { useState, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
Card,
CardContent,
CardHeader,
CardTitle,
} from "@/components/ui/card";
import { Users, UserCog2, Briefcase, Mail, ArrowLeft, XCircle, CheckCircle, UserIcon, Stethoscope, Building, Search, MapPin, Phone, LogOut } from 'lucide-react'
import { Badge } from "@/components/ui/badge";
import {
AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle,
AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface User {
id: number
name: string
email: string
role: "Broker" | "Provider" | "Employer"
lastLogin: string
status: "Active" | "Inactive"
businessName?: string
practiceName?: string
address?: {
street?: string
apartment?: string
city?: string
state?: string
zipCode?: string
}
phone?: string
dateJoined?: string
credential?: string // Add credential field
}

// Mock data for demonstration - replace with actual data fetching
const usersData: User[] = [
{
id: 1,
name: "John Doe",
email: "john.doe@example.com",
role: "Broker",
lastLogin: "2024-04-20",
status: "Active",
businessName: "ABC Insurance",
address: {
street: "123 Main St",
apartment: "Suite 101",
city: "Anytown",
state: "CA",
zipCode: "12345",
},
phone: "555-1212",
dateJoined: "2024-01-15",
},
{
id: 2,
name: "Jane Smith",
email: "jane.smith@example.com",
role: "Provider",
lastLogin: "2024-04-21",
status: "Active",
practiceName: "HealthFirst Clinic",
address: {
street: "456 Elm St",
city: "Anytown",
state: "CA",
zipCode: "54321",
},
phone: "555-3434",
dateJoined: "2024-02-20",
credential: "MD",
},
{
id: 3,
name: "David Lee",
email: "david.lee@example.com",
role: "Employer",
lastLogin: "2024-04-22",
status: "Inactive",
businessName: "TechCorp Inc.",
address: {
street: "789 Oak St",
city: "Anytown",
state: "CA",
zipCode: "98765",
},
phone: "555-5656",
dateJoined: "2024-03-10",
},
// ... more users
];

export default function AccountManagementPage() {
const [users, setUsers] = useState<User[]>([]);
const [activeTab, setActiveTab] = useState<"Employer" | "Provider" | "Broker">("Employer")
const [searchTerm, setSearchTerm] = useState("")

useEffect(() => {
const fetchUsers = async () => {
try {
  const response = await new Promise<User[]>((resolve) => {
    setTimeout(() => resolve(usersData), 500);
  });
  setUsers(response);
} catch (error) {
  console.error("Error fetching users:", error);
  toast({
    title: "Error",
    description: "Failed to load user data.",
    variant: "destructive",
  });
}
};

fetchUsers();
}, []);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setSearchTerm(e.target.value)
}

const filteredUsers = users.filter(user =>
(user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
(user.businessName && user.businessName.toLowerCase().includes(searchTerm.toLowerCase())) ||
(user.practiceName && user.practiceName.toLowerCase().includes(searchTerm.toLowerCase()))) &&
user.role === activeTab
)

const handleLogout = () => {
// Implement logout logic here
console.log("Logout clicked")
toast({
title: "Logged out",
description: "You have been successfully logged out.",
});
}

return (
<div className="flex flex-col min-h-screen">
  {/* New Header */}
  <header className="bg-white border-b border-gray-200 py-4">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.svg"
          alt="Health Benefits Platform Logo"
          width={40}
          height={40}
          className="mr-2"
        />
      </Link>
      <Button
        onClick={handleLogout}
        className="bg-[#1400FF] hover:bg-blue-700 text-white rounded-full"
      >
        Logout
      </Button>
    </div>
  </header>

  <div className="flex-1 space-y-4 p-8 pt-6">
    <div className="flex items-center justify-between space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">Account Management</h2>
      <div className="flex items-center space-x-2">
        <Button asChild variant="outline">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>

    <Card className="relative">
      <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
      <CardHeader>
        <CardTitle>Manage Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative flex flex-col justify-between flex-grow">
          <Tabs defaultValue="Employer" className="w-full" onValueChange={(value) => setActiveTab(value as "Employer" | "Provider" | "Broker")}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="Employer" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
                  Employers
                </TabsTrigger>
                <TabsTrigger value="Provider" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
                  Providers
                </TabsTrigger>
                <TabsTrigger value="Broker" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>
                  Brokers
                </TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 w-64"
                />
              </div>
            </div>
            {["Employer", "Provider", "Broker"].map((role) => (
              <TabsContent key={role} value={role}>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="p-4 relative">
                      <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
                      <div>
                        <h3 className="font-medium text-lg">
                          {user.role === "Provider" ? user.practiceName : user.businessName}
                        </h3>
                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                          <MapPin className="h-4 w-4" />
                          <p>
                            {user.address?.street}
                            {user.address?.apartment && `, ${user.address?.apartment}`}
                            {user.address?.city && `, ${user.address?.city}, ${user.address?.state} ${user.address?.zipCode}`}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                          <Phone className="h-4 w-4" />
                          <p>{user.phone}</p>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{user.name}</p>
                        <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                      </div>
                      <div className="absolute top-1/2 right-4 -translate-y-1/2">
                        <Button asChild>
                          <Link href={`/admin/account-management/${user.role.toLowerCase()}/${user.id}`} className="text-white bg-black">
                            View More Details
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                  {filteredUsers.length === 0 && (
                    <p className="text-gray-500">No users found.</p>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
)
}

