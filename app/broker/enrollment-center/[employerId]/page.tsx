"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { ArrowLeft, Search, MapPin, ChevronDown, ChevronUp, Globe, Mail, Phone, Check } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React from "react"
import { brokerApi } from "@/utils/broker-api-client"

interface Dependent {
  id: string
  firstName: string
  lastName: string
  relationship: string
  dateOfBirth: string
  sex: "Male" | "Female" | "Other"
  selected: boolean
  membershipTier: string
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
  selected: boolean
  membershipTier: string
  dependents: Dependent[]
}

interface Practice {
  id: string
  name: string
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
  membershipTiers: { name: string; price: number; description: string }[]
}

const practices: Practice[] = [
  {
    id: "1",
    name: "HealthFirst Clinic",
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
    membershipTiers: [
      { name: "Basic", price: 50, description: "Annual check-up and basic care" },
      { name: "Standard", price: 100, description: "Includes specialist referrals and priority scheduling" },
      { name: "Premium", price: 200, description: "24/7 access, home visits, and comprehensive care" },
    ],
  },
  {
    id: "2",
    name: "Kids Care Center",
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
    membershipTiers: [
      { name: "Child Basic", price: 75, description: "Regular check-ups and vaccinations" },
      { name: "Child Plus", price: 150, description: "Includes specialist care and 24/7 nurse hotline" },
    ],
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
    selected: false,
    membershipTier: "Basic",
    dependents: [
      {
        id: "1-1",
        firstName: "Bob",
        lastName: "Johnson",
        relationship: "Spouse",
        dateOfBirth: "1983-07-22",
        sex: "Male",
        selected: false,
        membershipTier: "Basic",
      },
      {
        id: "1-2",
        firstName: "Charlie",
        lastName: "Johnson",
        relationship: "Child",
        dateOfBirth: "2010-11-05",
        sex: "Male",
        selected: false,
        membershipTier: "Basic",
      },
    ],
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
    selected: false,
    membershipTier: "Basic",
    dependents: [
      {
        id: "2-1",
        firstName: "Eva",
        lastName: "Smith",
        relationship: "Child",
        dateOfBirth: "2015-04-12",
        sex: "Female",
        selected: false,
        membershipTier: "Basic",
      },
    ],
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
    selected: false,
    membershipTier: "Basic",
    dependents: [],
  },
]

export default function BrokerEnrollmentPage({ params }: { params: { employerId: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedPractice, setExpandedPractice] = useState<string | null>(null)
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null)
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [selectAll, setSelectAll] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isEnrollmentComplete, setIsEnrollmentComplete] = useState(false)
  const [expandedEmployees, setExpandedEmployees] = useState<string[]>([])

  const filteredPractices = practices.filter(
    (practice) =>
      practice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      practice.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      practice.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      practice.address.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const togglePracticeExpansion = (practiceId: string) => {
    setExpandedPractice(expandedPractice === practiceId ? null : practiceId)
  }

  const handlePracticeSelection = (practice: Practice) => {
    setSelectedPractice(practice)
    setEmployees(
      initialEmployees.map((emp) => ({
        ...emp,
        selected: false,
        dependents: emp.dependents.map((dep) => ({ ...dep, selected: false })),
      })),
    )
    setSelectAll(false)
    setExpandedEmployees([])
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

  const updateEmployeeMembershipTier = (employeeId: string, tier: string) => {
    setEmployees(employees.map((emp) => (emp.id === employeeId ? { ...emp, membershipTier: tier } : emp)))
  }

  const updateDependentMembershipTier = (employeeId: string, dependentId: string, tier: string) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === employeeId
          ? {
              ...emp,
              dependents: emp.dependents.map((dep) =>
                dep.id === dependentId ? { ...dep, membershipTier: tier } : dep,
              ),
            }
          : emp,
      ),
    )
  }

  const toggleEmployeeExpansion = (employeeId: string) => {
    setExpandedEmployees((prev) =>
      prev.includes(employeeId) ? prev.filter((id) => id !== employeeId) : [...prev, employeeId],
    )
  }

  useEffect(() => {
    const allSelected = employees.every((emp) => emp.selected && emp.dependents.every((dep) => dep.selected))
    setSelectAll(allSelected)
  }, [employees])

  const calculateTotalCost = () => {
    if (!selectedPractice) return { monthly: 0, yearly: 0, employeeCount: 0, dependentCount: 0 }

    let employeeCount = 0
    let dependentCount = 0
    const monthlyCost = employees.reduce((total, emp) => {
      if (emp.selected) {
        employeeCount++
        const employeeTier = selectedPractice.membershipTiers.find((tier) => tier.name === emp.membershipTier)
        if (employeeTier) {
          total += employeeTier.price
        }

        emp.dependents.forEach((dep) => {
          if (dep.selected) {
            dependentCount++
            const dependentTier = selectedPractice.membershipTiers.find((tier) => tier.name === dep.membershipTier)
            if (dependentTier) {
              total += dependentTier.price
            }
          }
        })
      }
      return total
    }, 0)

    return {
      monthly: monthlyCost,
      yearly: monthlyCost * 12,
      employeeCount,
      dependentCount,
    }
  }

  const { monthly, yearly, employeeCount, dependentCount } = calculateTotalCost()

  const handleCompleteEnrollment = async () => {
    try {
      if (!selectedPractice) {
        throw new Error('No provider selected');
      }

      // Get selected employees and dependents with their membership tiers
      const selectedEmployees = employees.filter(emp => emp.selected);
      const membershipTiers: Record<string, string> = {};
      
      selectedEmployees.forEach(emp => {
        membershipTiers[emp.id] = emp.membershipTier;
        emp.dependents
          .filter(dep => dep.selected)
          .forEach(dep => {
            membershipTiers[dep.id] = dep.membershipTier;
          });
      });

      await brokerApi.submitProviderEnrollment(
        params.employerId,
        selectedPractice.id,
        membershipTiers
      );

      setIsEnrollmentComplete(true);
      toast({
        title: "Enrollment Submitted",
        description: "The enrollment request has been sent to the provider for approval.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      toast({
        title: "Failed to submit enrollment",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
    }
  };

  if (isEnrollmentComplete) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Enrollment Complete</h1>
        <p className="text-xl mb-8">Thank you for enrolling with {selectedPractice?.name}.</p>
        <Check className="mx-auto h-16 w-16 text-green-500 mb-8" />
        <Button asChild>
          <Link href="/broker/enrollment-center">Return to Enrollment Center</Link>
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
        <h1 className="text-3xl font-bold">Enroll Client with Provider</h1>
        <Button asChild variant="outline">
          <Link href="/broker/enrollment-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Employer Selection
          </Link>
        </Button>
      </div>

      {!selectedPractice && (
        <>
          <Card className="mb-6 relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader>
              <CardTitle>Find a Provider</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search providers by name, doctor, specialty, or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {filteredPractices.map((practice) => (
              <Card key={practice.id} className="relative">
                <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">{practice.name}</h3>
                      <p className="text-lg">{practice.doctorName}</p>
                      <p className="text-sm text-gray-500">{practice.specialty}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        {practice.address.street}, {practice.address.city}, {practice.address.state}{" "}
                        {practice.address.zipCode}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Globe className="mr-1 h-4 w-4" />
                        <a href={`https://${practice.website}`} target="_blank" rel="noopener noreferrer">
                          {practice.website}
                        </a>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => togglePracticeExpansion(practice.id)}>
                        {expandedPractice === practice.id ? (
                          <>
                            Less Info <ChevronUp className="ml-1 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            More Info <ChevronDown className="ml-1 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <Button onClick={() => handlePracticeSelection(practice)}>Select Provider</Button>
                    </div>
                  </div>
                  {expandedPractice === practice.id && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Contact Information</h4>
                          <div className="space-y-1">
                            <p className="flex items-center text-sm">
                              <Mail className="mr-2 h-4 w-4" /> {practice.email}
                            </p>
                            <p className="flex items-center text-sm">
                              <Phone className="mr-2 h-4 w-4" /> {practice.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Membership Tiers</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {practice.membershipTiers.map((tier, index) => (
                            <div key={index} className="border rounded p-3">
                              <h5 className="font-semibold">{tier.name}</h5>
                              <p className="text-sm text-gray-600">{tier.description}</p>
                              <p className="text-sm font-medium mt-1">${tier.price}/month</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {selectedPractice && (
        <>
          <Card className="mb-6 relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader>
              <CardTitle className="text-left text-2xl">Cost Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-left">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Total</h3>
                  <p className="text-lg">Monthly: ${monthly.toFixed(2)}</p>
                  <p className="text-lg">Yearly: ${yearly.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Employee</h3>
                  <p className="text-lg">Monthly: ${(monthly * 0.5).toFixed(2)}</p>
                  <p className="text-lg">Yearly: ${(yearly * 0.5).toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Employer</h3>
                  <p className="text-lg">Monthly: ${(monthly * 0.5).toFixed(2)}</p>
                  <p className="text-lg">Yearly: ${(yearly * 0.5).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader>
              <CardTitle>Employee Roster for {selectedPractice.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="select-all" checked={selectAll} onCheckedChange={toggleSelectAll} />
                  <label htmlFor="select-all">Select All</label>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Select</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date of Birth</TableHead>
                    <TableHead>Sex</TableHead>
                    <TableHead>Membership Tier</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <React.Fragment key={employee.id}>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={employee.selected}
                            onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Button variant="ghost" size="sm" onClick={() => toggleEmployeeExpansion(employee.id)}>
                              {expandedEmployees.includes(employee.id) ? (
                                <ChevronUp className="h-4 w-4 mr-2" />
                              ) : (
                                <ChevronDown className="h-4 w-4 mr-2" />
                              )}
                            </Button>
                            {employee.firstName} {employee.lastName}
                          </div>
                        </TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.dateOfBirth}</TableCell>
                        <TableCell>{employee.sex}</TableCell>
                        <TableCell>
                          <Select
                            value={employee.membershipTier}
                            onValueChange={(value) => updateEmployeeMembershipTier(employee.id, value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a tier" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedPractice.membershipTiers.map((tier) => (
                                <SelectItem key={tier.name} value={tier.name}>
                                  {tier.name} (${tier.price}/month)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                      {expandedEmployees.includes(employee.id) &&
                        employee.dependents.map((dependent) => (
                          <TableRow key={dependent.id} className="bg-muted/50">
                            <TableCell className="pl-8">
                              <Checkbox
                                checked={dependent.selected}
                                onCheckedChange={() => toggleDependentSelection(employee.id, dependent.id)}
                              />
                            </TableCell>
                            <TableCell className="pl-8">
                              {dependent.firstName} {dependent.lastName} ({dependent.relationship})
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell>{dependent.dateOfBirth}</TableCell>
                            <TableCell>{dependent.sex}</TableCell>
                            <TableCell>
                              <Select
                                value={dependent.membershipTier}
                                onValueChange={(value) =>
                                  updateDependentMembershipTier(employee.id, dependent.id, value)
                                }
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select a tier" />
                                </SelectTrigger>
                                <SelectContent>
                                  {selectedPractice.membershipTiers.map((tier) => (
                                    <SelectItem key={tier.name} value={tier.name}>
                                      {tier.name} (${tier.price}/month)
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
                  <DialogTrigger asChild>
                    <Button>Complete Enrollment</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Enrollment</DialogTitle>
                      <DialogDescription>Are you sure you want to complete the enrollment process?</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p>Provider: {selectedPractice.name}</p>
                      <p>Total Monthly Cost: ${monthly.toFixed(2)}</p>
                      <p>Total Yearly Cost: ${yearly.toFixed(2)}</p>
                      <p>Employees Enrolled: {employeeCount}</p>
                      <p>Dependents Enrolled: {dependentCount}</p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCompleteEnrollment}>Confirm Enrollment</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

