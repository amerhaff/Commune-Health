"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Search, ArrowLeft, PlusCircle, RefreshCw, Lock, Edit3, User, Briefcase, Stethoscope, Users } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface User {
  id: number
  name: string
  email: string
  role: "Broker" | "Provider" | "Employer"
  lastLogin: string
  status: "Active" | "Inactive"
  address?: string
  phone?: string
  dateJoined?: string
  credential?: string // Add credential field
  businessName?: string
  practiceName?: string
}

// Updated mock user data
const users: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Broker", lastLogin: "2024-04-20", status: "Active", businessName: "ABC Insurance", address: "Address Placeholder", phone: "Phone Placeholder", dateJoined: "Date Joined Placeholder" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Provider", lastLogin: "2024-04-21", status: "Active", practiceName: "HealthFirst Clinic", address: "Address Placeholder", phone: "Phone Placeholder", dateJoined: "Date Joined Placeholder" },
  { id: 3, name: "David Lee", email: "david.lee@example.com", role: "Employer", lastLogin: "2024-04-22", status: "Inactive", businessName: "TechCorp Inc.", address: "Address Placeholder", phone: "Phone Placeholder", dateJoined: "Date Joined Placeholder" },
  { id: 4, name: "Alice Brown", email: "alice.brown@example.com", role: "Broker", lastLogin: "2024-04-23", status: "Active", businessName: "Brown Benefits", address: "Address Placeholder", phone: "Phone Placeholder", dateJoined: "Date Joined Placeholder" },
  { id: 5, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Provider", lastLogin: "2024-04-24", status: "Inactive", practiceName: "Johnson Family Practice", address: "Address Placeholder", phone: "Phone Placeholder", dateJoined: "Date Joined Placeholder" },
  { id: 6, name: "Eva Williams", email: "eva.williams@example.com", role: "Employer", lastLogin: "2024-04-25", status: "Active", businessName: "Williams Manufacturing", address: "Address Placeholder", phone: "Phone Placeholder", dateJoined: "Date Joined Placeholder" },
]
// Removed redundant placeholder data addition

users.forEach(user => {
  if (user.role === "Provider") {
    user.credential = "MD"; // Placeholder credential
  }
});


export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<"Employer" | "Provider" | "Broker">("Employer")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(null)
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [newUserType, setNewUserType] = useState<"Broker" | "Provider" | "Employer" | null>(null)
  const [addUserStep, setAddUserStep] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setEditedUser({ ...user })
    setIsEditing(true)
  }

  const handleSaveUser = () => {
    if (editedUser) {
      // Send updated user data to the backend
      console.log("Saving user:", editedUser)
      // Update the user list with the edited user
      const updatedUsers = users.map(user => user.id === editedUser.id ? editedUser : user)
      // In a real application, you would update the state here
      // setUsers(updatedUsers)
      setIsEditing(false)
      setSelectedUser(null)
      setEditedUser(null)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setSelectedUser(null)
    setEditedUser(null)
  }

  const handleResetPassword = (user: User) => {
    // Send password reset request to the backend
    console.log("Resetting password for:", user)
  }

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active"
    // Send status update request to the backend
    console.log("Toggling status for:", user, newStatus)
    // Update the user list with the new status
    const updatedUsers = users.map(u => u.id === user.id ? { ...u, status: newStatus } : u)
    // In a real application, you would update the state here
    // setUsers(updatedUsers)
  }

  const handleAddUser = () => {
    setIsAddUserDialogOpen(true)
    setNewUserType(null)
    setAddUserStep(1)
  }

  const filteredUsers = users.filter(user =>
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.businessName && user.businessName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.practiceName && user.practiceName.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    user.role === activeTab
  )

  const AddUserForm = () => {
    const [formData, setFormData] = useState({
      // Common fields
      name: "",
      email: "",
      phone: "",
      // Broker specific fields
      businessName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      website: "",
      npnNumber: "",
      // Provider specific fields
      practiceName: "",
      specialty: "",
      medicalSchool: "",
      residency: "",
      fellowship: "",
      yearsOfExperience: "",
      deaNumber: "",
      npiNumber: "",
      // Employer specific fields
      companyName: "",
      industry: "",
      numberOfEmployees: "",
      ein: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // Handle form submission here
      console.log("Submitting new user:", newUserType, formData)
      setIsAddUserDialogOpen(false)
      // Reset form state
      setNewUserType(null)
      setAddUserStep(1)
      setFormData({
        name: "", email: "", phone: "",
        businessName: "", address: "", city: "", state: "", zipCode: "", website: "", npnNumber: "",
        practiceName: "", specialty: "", medicalSchool: "", residency: "", fellowship: "", yearsOfExperience: "", deaNumber: "", npiNumber: "",
        companyName: "", industry: "", numberOfEmployees: "", ein: "",
      })
    }

    const renderStep = () => {
      switch (addUserStep) {
        case 1:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select User Type</h3>
              <RadioGroup value={newUserType || ""} onValueChange={(value) => setNewUserType(value as "Broker" | "Provider" | "Employer")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Broker" id="broker" />
                  <Label htmlFor="broker">Broker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Provider" id="provider" />
                  <Label htmlFor="provider">Provider</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Employer" id="employer" />
                  <Label htmlFor="employer">Employer</Label>
                </div>
              </RadioGroup>
            </div>
          )
        case 2:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
              </div>
            </div>
          )
        case 3:
          switch (newUserType) {
            case "Broker":
              return (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Broker Details</h3>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" name="businessName" value={formData.businessName} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
                  </div>
                </div>
              )
            case "Provider":
              return (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Provider Details</h3>
                  <div className="space-y-2">
                    <Label htmlFor="practiceName">Practice Name</Label>
                    <Input id="practiceName" name="practiceName" value={formData.practiceName} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input id="specialty" name="specialty" value={formData.specialty} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicalSchool">Medical School</Label>
                    <Input id="medicalSchool" name="medicalSchool" value={formData.medicalSchool} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="residency">Residency</Label>
                    <Input id="residency" name="residency" value={formData.residency} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fellowship">Fellowship (if applicable)</Label>
                    <Input id="fellowship" name="fellowship" value={formData.fellowship} onChange={handleInputChange} />
                  </div>
                </div>
              )
            case "Employer":
              return (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Employer Details</h3>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" name="industry" value={formData.industry} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numberOfEmployees">Number of Employees</Label>
                    <Input id="numberOfEmployees" name="numberOfEmployees" type="number" value={formData.numberOfEmployees} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ein">EIN (Employer Identification Number)</Label>
                    <Input id="ein" name="ein" value={formData.ein} onChange={handleInputChange} required />
                  </div>
                </div>
              )
            default:
              return null
          }
        case 4:
          switch (newUserType) {
            case "Broker":
              return (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Broker Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" value={formData.website} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="npnNumber">NPN Number</Label>
                    <Input id="npnNumber" name="npnNumber" value={formData.npnNumber} onChange={handleInputChange} required />
                  </div>
                </div>
              )
            case "Provider":
              return (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Provider Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                    <Input id="yearsOfExperience" name="yearsOfExperience" type="number" value={formData.yearsOfExperience} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deaNumber">DEA Number</Label>
                    <Input id="deaNumber" name="deaNumber" value={formData.deaNumber} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="npiNumber">NPI Number</Label>
                    <Input id="npiNumber" name="npiNumber" value={formData.npiNumber} onChange={handleInputChange} required />
                  </div>
                </div>
              )
            case "Employer":
              return (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Employer Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
                  </div>
                </div>
              )
            default:
              return null
          }
        default:
          return null
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <DialogFooter className="mt-6">
          {addUserStep > 1 && (
            <Button type="button" variant="outline" onClick={() => setAddUserStep(addUserStep - 1)}>
              Back
            </Button>
          )}
          {addUserStep < 4 ? (
            <Button type="button" onClick={() => setAddUserStep(addUserStep + 1)} disabled={!newUserType || (addUserStep === 2 && !formData.name) || (addUserStep === 2 && !formData.email) || (addUserStep === 2 && !formData.phone)}>
              Next
            </Button>
          ) : (
            <Button type="submit">Add User</Button>
          )}
        </DialogFooter>
      </form>
    )
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
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button asChild variant="outline">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="mb-8 relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
        <CardHeader>
          <CardTitle>User Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-xl font-semibold">{users.length}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Total Employers</p>
                <p className="text-xl font-semibold">{users.filter(user => user.role === "Employer").length}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Stethoscope className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Total Providers</p>
                <p className="text-xl font-semibold">{users.filter(user => user.role === "Provider").length}</p>
              </div>
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Total Brokers</p>
                <p className="text-xl font-semibold">{users.filter(user => user.role === "Broker").length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Employer" className="w-full" onValueChange={(value) => setActiveTab(value as "Employer" | "Provider" | "Broker")}>
            <TabsList className="mb-4">
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
            {["Employer", "Provider", "Broker"].map((role) => (
              <TabsContent key={role} value={role}>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-full max-w-sm mr-4">
                    <Input
                      placeholder={`Search ${role}s...`}
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="pl-8 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                  
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{role === "Provider" ? "Practice Name" : "Business Name"}</TableHead>
                      <TableHead>Contact Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Date Joined</TableHead>
                      {role === "Provider" && <TableHead>Credential</TableHead>}
                      <TableHead>Last Login</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.role === "Provider" ? user.practiceName : user.businessName}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.address || "N/A"}</TableCell>
                        <TableCell>{user.phone || "N/A"}</TableCell>
                        <TableCell>{user.dateJoined || "N/A"}</TableCell>
                        {user.role === "Provider" && <TableCell>{user.credential}</TableCell>}
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "outline"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                            <Edit3 className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleResetPassword(user)}>
                            <Lock className="mr-2 h-4 w-4" />
                            Reset Password
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleToggleStatus(user)}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            {user.status === "Active" ? "Deactivate" : "Activate"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {isEditing && editedUser && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="businessOrPracticeName" className="text-right">
                  {editedUser.role === "Provider" ? "Practice Name" : "Business Name"}
                </Label>
                <Input
                  id="businessOrPracticeName"
                  value={editedUser.role === "Provider" ? editedUser.practiceName : editedUser.businessName}
                  onChange={(e) => setEditedUser({ 
                    ...editedUser, 
                    [editedUser.role === "Provider" ? "practiceName" : "businessName"]: e.target.value 
                  })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Contact Name
                </Label>
                <Input
                  id="name"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  className="col-span-3"
                  type="email"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editedUser.status}
                  onValueChange={(value) => setEditedUser({ ...editedUser, status: value as "Active" | "Inactive" })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSaveUser}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <AddUserForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}

