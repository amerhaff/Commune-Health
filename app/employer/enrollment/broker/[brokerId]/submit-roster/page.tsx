"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, ChevronDown, ChevronUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface MembershipTier {
  name: string
  price: number
  description: string
}

interface Education {
  degree: string
  institution: string
  graduationYear: number
  specialty?: string
}

interface Provider {
  id: string
  practiceName: string
  doctorName: string
  specialty: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  website: string
  email: string
  phone: string
  education: {
    medicalSchool: Education
    residency: Education
    fellowship?: Education
  }
  yearsOfExperience: number
}

interface Dependent {
  id: string
  firstName: string
  lastName: string
  relationship: string
  dateOfBirth: string
  sex: "Male" | "Female" | "Other"
  selected: boolean
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
  status: "Not Enrolled" | "Enrolled" | "Pending"
  dpcProvider: string
  selected: boolean
  dependents: Dependent[]
  employeeType: "Full-time" | "Part-time" | "Contract"
}

const providers: Provider[] = [
  {
    id: "1",
    practiceName: "HealthFirst Clinic",
    doctorName: "Dr. John Smith",
    specialty: "Family Medicine",
    address: {
      street: "123 Health Ave",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    website: "www.healthfirstclinic.com",
    email: "john.smith@healthfirstclinic.com",
    phone: "(555) 123-4567",
    education: {
      medicalSchool: {
        degree: "MD",
        institution: "Harvard Medical School",
        graduationYear: 2005,
      },
      residency: {
        degree: "Residency",
        institution: "Massachusetts General Hospital",
        graduationYear: 2008,
        specialty: "Family Medicine",
      },
    },
    yearsOfExperience: 15,
  },
  {
    id: "2",
    practiceName: "Kids Care Center",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Pediatrics",
    address: {
      street: "456 Child St",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
    },
    website: "www.kidscarecenter.com",
    email: "sarah.johnson@kidscarecenter.com",
    phone: "(555) 987-6543",
    education: {
      medicalSchool: {
        degree: "MD",
        institution: "Stanford University School of Medicine",
        graduationYear: 2007,
      },
      residency: {
        degree: "Residency",
        institution: "Children's Hospital Los Angeles",
        graduationYear: 2010,
        specialty: "Pediatrics",
      },
      fellowship: {
        degree: "Fellowship",
        institution: "Boston Children's Hospital",
        graduationYear: 2012,
        specialty: "Pediatric Cardiology",
      },
    },
    yearsOfExperience: 11,
  },
]

const initialEmployees: Employee[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    dateOfBirth: "1985-03-15",
    sex: "Female",
    address: "123 Main St",
    apartment: "Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    status: "Not Enrolled",
    dpcProvider: "",
    selected: false,
    dependents: [
      {
        id: "1-1",
        firstName: "Bob",
        lastName: "Johnson",
        relationship: "Spouse",
        dateOfBirth: "1983-07-22",
        sex: "Male",
        selected: false,
      },
      {
        id: "1-2",
        firstName: "Charlie",
        lastName: "Johnson",
        relationship: "Child",
        dateOfBirth: "2010-11-05",
        sex: "Male",
        selected: false,
      },
    ],
    employeeType: "Full-time",
  },
  {
    id: "2",
    firstName: "David",
    lastName: "Smith",
    email: "david@example.com",
    dateOfBirth: "1990-09-20",
    sex: "Male",
    address: "456 Elm St",
    apartment: "",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    status: "Pending",
    dpcProvider: "",
    selected: false,
    dependents: [
      {
        id: "2-1",
        firstName: "Eva",
        lastName: "Smith",
        relationship: "Child",
        dateOfBirth: "2015-04-12",
        sex: "Female",
        selected: false,
      },
    ],
    employeeType: "Part-time",
  },
  {
    id: "3",
    firstName: "Fiona",
    lastName: "Brown",
    email: "fiona@example.com",
    dateOfBirth: "1988-12-03",
    sex: "Female",
    address: "789 Oak St",
    apartment: "Suite 10",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    status: "Enrolled",
    dpcProvider: "HealthFirst Clinic",
    selected: false,
    dependents: [],
    employeeType: "Contract",
  },
]

export default function ProviderEnrollmentPage() {
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(providers[0])
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [selectAll, setSelectAll] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isEnrollmentComplete, setIsEnrollmentComplete] = useState(false)
  const [expandedEmployeeIds, setExpandedEmployeeIds] = useState<string[]>(initialEmployees.map((emp) => emp.id))
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("")

  const toggleProviderExpansion = (providerId: string) => {
    setExpandedProvider(expandedProvider === providerId ? null : providerId)
  }

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    setEmployees(
      employees.map((emp) => ({
        ...emp,
        selected: newSelectAll,
        dependents: emp.dependents.map((dep) => ({ ...dep, selected: newSelectAll })),
      })),
    )
  }

  const toggleEmployeeSelection = (employeeId: string) => {
    setEmployees(employees.map((emp) => (emp.id === employeeId ? { ...emp, selected: !emp.selected } : emp)))
  }

  const toggleEmployeeExpansion = (employeeId: string) => {
    setExpandedEmployeeIds((prevIds) =>
      prevIds.includes(employeeId) ? prevIds.filter((id) => id !== employeeId) : [...prevIds, employeeId],
    )
  }

  const toggleDependentSelection = (employeeId: string, dependentId: string) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === employeeId
          ? {
              ...emp,
              dependents: emp.dependents.map((dep) =>
                dep.id === dependentId ? { ...dep, selected: !dep.selected } : dep,
              ),
            }
          : emp,
      ),
    )
  }

  useEffect(() => {
    const allSelected = employees.every((emp) => emp.selected && emp.dependents.every((dep) => dep.selected))
    setSelectAll(allSelected)
  }, [employees])

  const handleCompleteEnrollment = async () => {
    // Here you would typically send the enrollment data to your backend
    // For this example, we'll simulate an API call with a timeout
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsEnrollmentComplete(true)
    setIsConfirmationOpen(false)
    toast({
      title: "Enrollment Completed",
      description: "Your enrollment has been successfully processed.",
      duration: 5000,
    })
  }

  const filteredEmployees = employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(employeeSearchTerm.toLowerCase()),
  )

  if (isEnrollmentComplete) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Quote Request Complete</h1>
        <p className="text-xl mb-8">
          Your request for a quote has been submitted. We will contact you shortly with the details.
        </p>
        <Check className="mx-auto h-16 w-16 text-green-500 mb-8" />
        <Button asChild>
          <Link href="/employer/home">Return to Dashboard</Link>
        </Button>
      </div>
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
        <h1 className="text-3xl font-bold">Enroll with Provider</h1>
        <Button asChild variant="outline">
          <Link href="/employer/enrollment/broker">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Link>
        </Button>
      </div>

      {selectedProvider && (
        <Card className="relative">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
          <CardHeader>
            <CardTitle>Employee Roster for {selectedProvider.practiceName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox checked={selectAll} onCheckedChange={toggleSelectAll} />
                <label>Select All</label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search employees..."
                  value={employeeSearchTerm}
                  onChange={(e) => setEmployeeSearchTerm(e.target.value)}
                  className="max-w-xs"
                />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Select</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Sex</TableHead>
                  <TableHead>Employee Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Apt/Suite</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>ZIP Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <React.Fragment key={employee.id}>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={employee.selected}
                            onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                          />
                          {employee.dependents.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleEmployeeExpansion(employee.id)}
                              className="p-0"
                            >
                              {expandedEmployeeIds.includes(employee.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{employee.firstName}</TableCell>
                      <TableCell>{employee.lastName}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.dateOfBirth}</TableCell>
                      <TableCell>{employee.sex}</TableCell>
                      <TableCell>{employee.employeeType}</TableCell>
                      <TableCell>{employee.address}</TableCell>
                      <TableCell>{employee.apartment}</TableCell>
                      <TableCell>{employee.city}</TableCell>
                      <TableCell>{employee.state}</TableCell>
                      <TableCell>{employee.zipCode}</TableCell>
                    </TableRow>
                    {employee.dependents.length > 0 && expandedEmployeeIds.includes(employee.id) && (
                      <TableRow>
                        <TableCell colSpan={12}>
                          <div className="mt-4 bg-gray-50 p-4 rounded-md">
                            <h4 className="text-sm font-semibold mb-2">Dependents</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[50px]">Select</TableHead>
                                  <TableHead>First Name</TableHead>
                                  <TableHead>Last Name</TableHead>
                                  <TableHead>Relationship</TableHead>
                                  <TableHead>Date of Birth</TableHead>
                                  <TableHead>Sex</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {employee.dependents.map((dependent) => (
                                  <TableRow key={dependent.id}>
                                    <TableCell>
                                      <Checkbox
                                        checked={dependent.selected}
                                        onCheckedChange={() => toggleDependentSelection(employee.id, dependent.id)}
                                      />
                                    </TableCell>
                                    <TableCell>{dependent.firstName}</TableCell>
                                    <TableCell>{dependent.lastName}</TableCell>
                                    <TableCell>{dependent.relationship}</TableCell>
                                    <TableCell>{dependent.dateOfBirth}</TableCell>
                                    <TableCell>{dependent.sex}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
                <DialogTrigger asChild>
                  <Button>Request Quote</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Quote Request</DialogTitle>
                    <DialogDescription>Are you sure you want to request a quote?</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCompleteEnrollment}>Confirm Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

