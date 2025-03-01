"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Users,
  ChevronDown,
  ChevronUp,
  Building2,
  Plus,
  UserPlus,
  UserMinus,
  ChevronRight,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Dependent {
  id: string
  firstName: string
  lastName: string
  relationship: string
  dateOfBirth: string
  sex: "Male" | "Female" | "Other"
  isEnrolled: boolean
  membershipTier: string
  monthlySubscription: number
  enrollmentDate?: string
}

interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  sex: "Male" | "Female" | "Other"
  address: string
  apartment: string
  city: string
  state: string
  zipCode: string
  employeeType: "Full-Time" | "Part-Time" | "Temporary" | "Contractor" // Add this line
  status: "Not Enrolled" | "Enrolled" | "Pending"
  dpcProvider: string
  membershipTier: string
  monthlySubscription: number
  dependents: Dependent[]
  isExpanded?: boolean
  enrollmentDate?: string
}

interface Client {
  id: string
  name: string
  industry: string
  totalEmployees: number
  address: {
    street: string
    apartment?: string
    city: string
    state: string
    zipCode: string
  }
  contactPerson: string
  contactEmail: string
  contactPhone: string
  enrolledEmployees: number
  enrolledDependents: number
  employees: Employee[]
  isExpanded: boolean
}

const usStates = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
]

export default function ClientRosterPage() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "TechCorp Inc.",
      industry: "Technology",
      totalEmployees: 100,
      address: { street: "123 Main St", city: "Anytown", state: "CA", zipCode: "90210" },
      contactPerson: "John Smith",
      contactEmail: "john.smith@techcorp.com",
      contactPhone: "555-123-4567",
      enrolledEmployees: 5,
      enrolledDependents: 7,
      isExpanded: false,
      employees: [
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "john@techcorp.com",
          dateOfBirth: "1985-05-15",
          sex: "Male",
          address: "456 Tech St",
          apartment: "Apt 7",
          city: "San Francisco",
          state: "CA",
          zipCode: "94105",
          employeeType: "Full-Time",
          status: "Enrolled",
          dpcProvider: "HealthFirst Clinic",
          membershipTier: "Standard",
          monthlySubscription: 99,
          dependents: [
            {
              id: "1-1",
              firstName: "Jane",
              lastName: "Doe",
              relationship: "Spouse",
              dateOfBirth: "1987-03-20",
              sex: "Female",
              isEnrolled: true,
              membershipTier: "Standard",
              monthlySubscription: 99,
              enrollmentDate: "2023-10-26",
            },
            {
              id: "1-2",
              firstName: "Jimmy",
              lastName: "Doe",
              relationship: "Child",
              dateOfBirth: "2010-11-05",
              sex: "Male",
              isEnrolled: true,
              membershipTier: "Basic",
              monthlySubscription: 49,
              enrollmentDate: "2023-10-26",
            },
          ],
          isExpanded: false,
          enrollmentDate: "2023-10-26",
        },
        {
          id: "2",
          firstName: "Alice",
          lastName: "Smith",
          email: "alice@techcorp.com",
          dateOfBirth: "1990-08-22",
          sex: "Female",
          address: "789 Tech Ave",
          apartment: "",
          city: "San Francisco",
          state: "CA",
          zipCode: "94105",
          employeeType: "Full-Time",
          status: "Enrolled",
          dpcProvider: "HealthFirst Clinic",
          membershipTier: "Premium",
          monthlySubscription: 149,
          dependents: [],
          isExpanded: false,
          enrollmentDate: "2023-10-26",
        },
      ],
    },
    {
      id: "2",
      name: "HealthCare Solutions",
      industry: "Healthcare",
      totalEmployees: 50,
      address: { street: "456 Elm St", city: "Anytown", state: "NY", zipCode: "10001" },
      contactPerson: "Jane Doe",
      contactEmail: "jane.doe@healthcare.com",
      contactPhone: "555-987-6543",
      enrolledEmployees: 3,
      enrolledDependents: 5,
      isExpanded: false,
      employees: [
        {
          id: "3",
          firstName: "Bob",
          lastName: "Johnson",
          email: "bob@healthcare.com",
          dateOfBirth: "1988-03-10",
          sex: "Male",
          address: "123 Health Rd",
          apartment: "Suite 5",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          employeeType: "Full-Time",
          status: "Enrolled",
          dpcProvider: "City Health Center",
          membershipTier: "Basic",
          monthlySubscription: 49,
          dependents: [
            {
              id: "3-1",
              firstName: "Sarah",
              lastName: "Johnson",
              relationship: "Spouse",
              dateOfBirth: "1989-07-15",
              sex: "Female",
              isEnrolled: true,
              membershipTier: "Basic",
              monthlySubscription: 49,
              enrollmentDate: "2023-10-26",
            },
            {
              id: "3-2",
              firstName: "Tommy",
              lastName: "Johnson",
              relationship: "Child",
              dateOfBirth: "2012-04-30",
              sex: "Male",
              isEnrolled: true,
              membershipTier: "Basic",
              monthlySubscription: 49,
              enrollmentDate: "2023-10-26",
            },
          ],
          isExpanded: false,
          enrollmentDate: "2023-10-26",
        },
      ],
    },
  ])

  const [newClient, setNewClient] = useState({
    name: "",
    industry: "",
    totalEmployees: 0,
    address: {
      street: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
    },
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
  })

  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    sex: "" as "Male" | "Female" | "Other",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    employeeType: "Full-Time" as "Full-Time" | "Part-Time" | "Temporary" | "Contractor",
    status: "Not Enrolled" as "Not Enrolled" | "Enrolled" | "Pending",
    dpcProvider: "",
    membershipTier: "",
    monthlySubscription: 0,
  })

  const [newDependent, setNewDependent] = useState({
    firstName: "",
    lastName: "",
    relationship: "",
    dateOfBirth: "",
    sex: "Other" as "Male" | "Female" | "Other",
    isEnrolled: false,
    membershipTier: "",
    monthlySubscription: 0,
  })

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false)

  const totalEnrollees = clients.reduce((sum, client) => sum + client.enrolledEmployees + client.enrolledDependents, 0)
  const totalEnrolledEmployees = clients.reduce((sum, client) => sum + client.enrolledEmployees, 0)
  const totalEnrolledDependents = clients.reduce((sum, client) => sum + client.enrolledDependents, 0)
  //const totalRevenue = clients.reduce((sum, client) => sum + client.employees.reduce((empSum, employee) => empSum + employee.monthlySubscription + employee.dependents.reduce((depSum, dependent) => depSum + dependent.monthlySubscription, 0), 0), 0)

  const handleAddClient = () => {
    if (newClient.name.trim()) {
      const newClientObj: Client = {
        id: (clients.length + 1).toString(),
        ...newClient,
        enrolledEmployees: 0,
        enrolledDependents: 0,
        isExpanded: false,
        employees: [],
      }
      setClients([...clients, newClientObj])
      setNewClient({
        name: "",
        industry: "",
        totalEmployees: 0,
        address: {
          street: "",
          apartment: "",
          city: "",
          state: "",
          zipCode: "",
        },
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
      })
      setIsClientDialogOpen(false)
      toast({
        title: "Client Added",
        description: `${newClient.name} has been successfully added.`,
      })
    }
  }

  const handleAddEmployee = () => {
    if (selectedClientId && newEmployee.firstName && newEmployee.lastName && newEmployee.email) {
      const updatedClients = clients.map((client) => {
        if (client.id === selectedClientId) {
          const newEmployeeObj: Employee = {
            id: (client.employees.length + 1).toString(),
            ...newEmployee,
            dependents: [],
            isExpanded: false,
            enrollmentDate: new Date().toISOString().slice(0, 10),
          }
          return {
            ...client,
            enrolledEmployees:
              newEmployee.status === "Enrolled" ? client.enrolledEmployees + 1 : client.enrolledEmployees,
            employees: [...client.employees, newEmployeeObj],
          }
        }
        return client
      })
      setClients(updatedClients)
      setNewEmployee({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        sex: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        employeeType: "Full-Time",
        status: "Not Enrolled",
        dpcProvider: "",
        membershipTier: "",
        monthlySubscription: 0,
      })
      setSelectedClientId(null)
      toast({
        title: "Employee Added",
        description: `${newEmployee.firstName} ${newEmployee.lastName} has been successfully added.`,
      })
    }
  }

  const handleAddDependent = () => {
    if (selectedClientId && selectedEmployeeId && newDependent.firstName && newDependent.lastName) {
      const updatedClients = clients.map((client) => {
        if (client.id === selectedClientId) {
          return {
            ...client,
            enrolledDependents: newDependent.isEnrolled ? client.enrolledDependents + 1 : client.enrolledDependents,
            employees: client.employees.map((employee) => {
              if (employee.id === selectedEmployeeId) {
                return {
                  ...employee,
                  dependents: [
                    ...employee.dependents,
                    {
                      id: (employee.dependents.length + 1).toString(),
                      ...newDependent,
                      enrollmentDate: new Date().toISOString().slice(0, 10),
                    },
                  ],
                }
              }
              return employee
            }),
          }
        }
        return client
      })
      setClients(updatedClients)
      setNewDependent({
        firstName: "",
        lastName: "",
        relationship: "",
        dateOfBirth: "",
        sex: "Other",
        isEnrolled: false,
        membershipTier: "",
        monthlySubscription: 0,
      })
      setSelectedClientId(null)
      setSelectedEmployeeId(null)
      toast({
        title: "Dependent Added",
        description: `${newDependent.firstName} ${newDependent.lastName} has been successfully added.`,
      })
    }
  }

  const handleRemoveEmployee = (clientId: string, employeeId: string) => {
    const updatedClients = clients.map((client) => {
      if (client.id === clientId) {
        const employeeToRemove = client.employees.find((emp) => emp.id === employeeId)
        return {
          ...client,
          enrolledEmployees:
            employeeToRemove?.status === "Enrolled" ? client.enrolledEmployees - 1 : client.enrolledEmployees,
          enrolledDependents:
            client.enrolledDependents - (employeeToRemove?.dependents.filter((dep) => dep.isEnrolled).length || 0),
          employees: client.employees.filter((emp) => emp.id !== employeeId),
        }
      }
      return client
    })
    setClients(updatedClients)
    toast({
      title: "Employee Removed",
      description: "The employee and their dependents have been removed.",
    })
  }

  const handleRemoveDependent = (clientId: string, employeeId: string, dependentId: string) => {
    const updatedClients = clients.map((client) => {
      if (client.id === clientId) {
        return {
          ...client,
          enrolledDependents: client.enrolledDependents - 1,
          employees: client.employees.map((employee) => {
            if (employee.id === employeeId) {
              return {
                ...employee,
                dependents: employee.dependents.filter((dep) => dep.id !== dependentId),
              }
            }
            return employee
          }),
        }
      }
      return client
    })
    setClients(updatedClients)
    toast({
      title: "Dependent Removed",
      description: "The dependent has been removed.",
    })
  }

  const handleRemoveClient = (clientId: string) => {
    setClients(clients.filter((client) => client.id !== clientId))
    toast({
      title: "Client Removed",
      description: "The client and all associated employees have been removed.",
    })
  }

  const toggleClientExpansion = (clientId: string) => {
    setClients(
      clients.map((client) => (client.id === clientId ? { ...client, isExpanded: !client.isExpanded } : client)),
    )
  }

  const toggleEmployeeExpansion = (clientId: string, employeeId: string) => {
    setClients(
      clients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              employees: client.employees.map((employee) =>
                employee.id === employeeId ? { ...employee, isExpanded: !employee.isExpanded } : employee,
              ),
            }
          : client,
      ),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Enrolled":
        return <Badge className="bg-green-500 hover:bg-green-600">Enrolled</Badge>
      case "Not Enrolled":
        return <Badge variant="destructive">Not Enrolled</Badge>
      case "Pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      default:
        return null
    }
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
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
              window.location.href = "/"
            }}
            className="rounded-full"
            style={{ backgroundColor: "#1400FF" }}
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Client Roster</h1>
        <div className="flex space-x-2">
          <Dialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Employer</DialogTitle>
                <DialogDescription>Enter the details of the new employer below.</DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={newClient.name}
                          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select
                          value={newClient.industry}
                          onValueChange={(value) => setNewClient({ ...newClient, industry: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numberOfEmployees">Number of Employees</Label>
                      <Input
                        id="numberOfEmployees"
                        type="number"
                        value={newClient.totalEmployees}
                        onChange={(e) =>
                          setNewClient({ ...newClient, totalEmployees: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={newClient.address.street}
                        onChange={(e) =>
                          setNewClient({ ...newClient, address: { ...newClient.address, street: e.target.value } })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apartment">Apartment/Suite (optional)</Label>
                      <Input
                        id="apartment"
                        value={newClient.address.apartment}
                        onChange={(e) =>
                          setNewClient({ ...newClient, address: { ...newClient.address, apartment: e.target.value } })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={newClient.address.city}
                          onChange={(e) =>
                            setNewClient({ ...newClient, address: { ...newClient.address, city: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={newClient.address.state}
                          onValueChange={(value) =>
                            setNewClient({ ...newClient, address: { ...newClient.address, state: value } })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            {usStates.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={newClient.address.zipCode}
                        onChange={(e) =>
                          setNewClient({ ...newClient, address: { ...newClient.address, zipCode: e.target.value } })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person</Label>
                      <Input
                        id="contactPerson"
                        value={newClient.contactPerson}
                        onChange={(e) => setNewClient({ ...newClient, contactPerson: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={newClient.contactEmail}
                          onChange={(e) => setNewClient({ ...newClient, contactEmail: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Contact Phone</Label>
                        <Input
                          id="contactPhone"
                          value={newClient.contactPhone}
                          onChange={(e) => setNewClient({ ...newClient, contactPhone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter>
                <Button onClick={handleAddClient} className="w-full">
                  Add Employer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button asChild variant="outline">
            <Link href="/broker/home">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mb-8 relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <Building2 className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Total Clients</p>
                <p className="text-xl font-semibold">{clients.length}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Total Enrollees</p>
                <p className="text-xl font-semibold">{totalEnrollees}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {clients.map((client) => (
          <Card key={client.id} className="relative">
            <CardContent className="p-4">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold">{client.name}</h3>
                  <p className="text-sm text-gray-600">
                    {client.address.street}, {client.address.city}, {client.address.state} {client.address.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">
                    Employees: {client.totalEmployees} | Enrolled: {client.enrolledEmployees} employees +{" "}
                    {client.enrolledDependents} dependents | Unenrolled:{" "}
                    {client.totalEmployees - client.enrolledEmployees}
                  </p>
                </div>
                <div className="mt-2">
                  <Button variant="outline" size="sm" onClick={() => toggleClientExpansion(client.id)}>
                    {client.isExpanded ? "Less Info" : "More Info"}
                    {client.isExpanded ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              {client.isExpanded && (
                <>
                  <div className="mb-4">
                    <p className="text-sm">
                      <strong>Contact:</strong> {client.contactPerson}
                    </p>
                    <p className="text-sm">
                      <strong>Email:</strong> {client.contactEmail}
                    </p>
                    <p className="text-sm">
                      <strong>Phone:</strong> {client.contactPhone}
                    </p>
                  </div>
                  <h4 className="font-semibold mb-2">Employee Roster</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date of Birth</TableHead>
                        <TableHead>Sex</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Employee Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Enrollment Date</TableHead>
                        <TableHead>DPC Practice</TableHead>
                        <TableHead>Membership Tier</TableHead>
                        <TableHead>Monthly Subscription</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {client.employees.map((employee) => (
                        <React.Fragment key={employee.id}>
                          <TableRow>
                            <TableCell>
                              {employee.dependents.length > 0 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-0"
                                  onClick={() => toggleEmployeeExpansion(client.id, employee.id)}
                                >
                                  {employee.isExpanded ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </Button>
                              )}
                            </TableCell>
                            <TableCell>
                              {employee.firstName} {employee.lastName}
                            </TableCell>
                            <TableCell>{employee.dateOfBirth}</TableCell>
                            <TableCell>{employee.sex}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.employeeType}</TableCell>
                            <TableCell>{getStatusBadge(employee.status)}</TableCell>
                            <TableCell>{employee.enrollmentDate || "N/A"}</TableCell>
                            <TableCell>{employee.dpcProvider || "N/A"}</TableCell>
                            <TableCell>{employee.membershipTier || "N/A"}</TableCell>
                            <TableCell>${employee.monthlySubscription || 0}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedClientId(client.id)
                                        setSelectedEmployeeId(employee.id)
                                      }}
                                    >
                                      <UserPlus className="h-4 w-4 mr-2" />
                                      Add Dependent
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Add Dependent for {employee.firstName} {employee.lastName}
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dependentFirstName" className="text-right">
                                          First Name
                                        </Label>
                                        <Input
                                          id="dependentFirstName"
                                          value={newDependent.firstName}
                                          onChange={(e) =>
                                            setNewDependent({ ...newDependent, firstName: e.target.value })
                                          }
                                          className="col-span-3"
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dependentLastName" className="text-right">
                                          Last Name
                                        </Label>
                                        <Input
                                          id="dependentLastName"
                                          value={newDependent.lastName}
                                          onChange={(e) =>
                                            setNewDependent({ ...newDependent, lastName: e.target.value })
                                          }
                                          className="col-span-3"
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dependentRelationship" className="text-right">
                                          Relationship
                                        </Label>
                                        <Input
                                          id="dependentRelationship"
                                          value={newDependent.relationship}
                                          onChange={(e) =>
                                            setNewDependent({ ...newDependent, relationship: e.target.value })
                                          }
                                          className="col-span-3"
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dependentDateOfBirth" className="text-right">
                                          Date of Birth
                                        </Label>
                                        <Input
                                          id="dependentDateOfBirth"
                                          type="date"
                                          value={newDependent.dateOfBirth}
                                          onChange={(e) =>
                                            setNewDependent({ ...newDependent, dateOfBirth: e.target.value })
                                          }
                                          className="col-span-3"
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dependentSex" className="text-right">
                                          Sex
                                        </Label>
                                        <Select
                                          value={newDependent.sex}
                                          onValueChange={(value) =>
                                            setNewDependent({
                                              ...newDependent,
                                              sex: value as "Male" | "Female" | "Other",
                                            })
                                          }
                                          className="col-span-3"
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select sex" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dependentIsEnrolled" className="text-right">
                                          Is Enrolled
                                        </Label>
                                        <Input
                                          id="dependentIsEnrolled"
                                          type="checkbox"
                                          checked={newDependent.isEnrolled}
                                          onChange={(e) =>
                                            setNewDependent({ ...newDependent, isEnrolled: e.target.checked })
                                          }
                                          className="col-span-1"
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dependentMembershipTier" className="text-right">
                                          Membership Tier
                                        </Label>
                                        <Input
                                          id="dependentMembershipTier"
                                          value={newDependent.membershipTier}
                                          onChange={(e) =>
                                            setNewDependent({ ...newDependent, membershipTier: e.target.value })
                                          }
                                          className="col-span-3"
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dependentMonthlySubscription" className="text-right">
                                          Monthly Subscription
                                        </Label>
                                        <Input
                                          id="dependentMonthlySubscription"
                                          type="number"
                                          value={newDependent.monthlySubscription}
                                          onChange={(e) =>
                                            setNewDependent({
                                              ...newDependent,
                                              monthlySubscription: Number.parseInt(e.target.value) || 0,
                                            })
                                          }
                                          className="col-span-3"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button onClick={handleAddDependent}>Add Dependent</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleRemoveEmployee(client.id, employee.id)}
                                >
                                  <UserMinus className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          {employee.isExpanded &&
                            employee.dependents.map((dependent) => (
                              <TableRow key={dependent.id} className="bg-gray-50">
                                <TableCell></TableCell>
                                <TableCell className="pl-8 font-medium">
                                  {dependent.firstName} {dependent.lastName} (Dependent)
                                </TableCell>
                                <TableCell>{dependent.dateOfBirth}</TableCell>
                                <TableCell>{dependent.sex}</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>
                                  {dependent.isEnrolled ? (
                                    <Badge variant="default">Enrolled</Badge>
                                  ) : (
                                    <Badge variant="outline">Not Enrolled</Badge>
                                  )}
                                </TableCell>
                                <TableCell>{dependent.enrollmentDate || "N/A"}</TableCell>
                                <TableCell>{employee.dpcProvider}</TableCell>
                                <TableCell>{dependent.membershipTier || "N/A"}</TableCell>
                                <TableCell>${dependent.monthlySubscription || 0}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRemoveDependent(client.id, employee.id, dependent.id)}
                                  >
                                    <UserMinus className="h-4 w-4 mr-2" />
                                    Remove
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => setSelectedClientId(client.id)}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Add Employee
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Employee for {client.name}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employeeFirstName" className="text-right">
                              First Name
                            </Label>
                            <Input
                              id="employeeFirstName"
                              value={newEmployee.firstName}
                              onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employeeLastName" className="text-right">
                              Last Name
                            </Label>
                            <Input
                              id="employeeLastName"
                              value={newEmployee.lastName}
                              onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employeeEmail" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="employeeEmail"
                              type="email"
                              value={newEmployee.email}
                              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employeeDateOfBirth" className="text-right">
                              Date of Birth
                            </Label>
                            <Input
                              id="employeeDateOfBirth"
                              type="date"
                              value={newEmployee.dateOfBirth}
                              onChange={(e) => setNewEmployee({ ...newEmployee, dateOfBirth: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employeeSex" className="text-right">
                              Sex
                            </Label>
                            <Select
                              value={newEmployee.sex}
                              onValueChange={(value) =>
                                setNewEmployee({ ...newEmployee, sex: value as "Male" | "Female" | "Other" })
                              }
                              className="col-span-3"
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select sex" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employeeType" className="text-right">
                              Employee Type
                            </Label>
                            <Select
                              value={newEmployee.employeeType}
                              onValueChange={(value) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  employeeType: value as "Full-Time" | "Part-Time" | "Temporary" | "Contractor",
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select employee type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Full-Time">Full-Time</SelectItem>
                                <SelectItem value="Part-Time">Part-Time</SelectItem>
                                <SelectItem value="Temporary">Temporary</SelectItem>
                                <SelectItem value="Contractor">Contractor</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employeeStatus" className="text-right">
                              Status
                            </Label>
                            <Select
                              value={newEmployee.status}
                              onValueChange={(value) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  status: value as "Not Enrolled" | "Enrolled" | "Pending",
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Not Enrolled">Not Enrolled</SelectItem>
                                <SelectItem value="Enrolled">Enrolled</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employeeDpcProvider" className="text-right">
                              DPC Provider
                            </Label>
                            <Input
                              id="employeeDpcProvider"
                              value={newEmployee.dpcProvider}
                              onChange={(e) => setNewEmployee({ ...newEmployee, dpcProvider: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employeeMembershipTier" className="text-right">
                              Membership Tier
                            </Label>
                            <Input
                              id="employeeMembershipTier"
                              value={newEmployee.membershipTier}
                              onChange={(e) => setNewEmployee({ ...newEmployee, membershipTier: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="employeeMonthlySubscription" className="text-right">
                              Monthly Subscription
                            </Label>
                            <Input
                              type="number"
                              id="employeeMonthlySubscription"
                              value={newEmployee.monthlySubscription}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  monthlySubscription: Number.parseInt(e.target.value) || 0,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleAddEmployee}>Add Employee</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

