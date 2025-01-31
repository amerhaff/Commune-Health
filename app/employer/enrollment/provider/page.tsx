"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, MapPin, Stethoscope, ChevronDown, ChevronUp, Globe, Mail, Phone, Users, Check } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
  membershipTiers: MembershipTier[]
}

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
  status: "Not Enrolled" | "Enrolled" | "Pending"
  dpcProvider: string
  membershipTier: string
  selected: boolean
  dependents: Dependent[]
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
      zipCode: "10001"
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
    membershipTiers: [
      { name: "Basic", price: 50, description: "Annual check-up and basic care" },
      { name: "Standard", price: 100, description: "Includes specialist referrals and priority scheduling" },
      { name: "Premium", price: 200, description: "24/7 access, home visits, and comprehensive care" }
    ]
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
      zipCode: "90001"
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
    membershipTiers: [
      { name: "Child Basic", price: 75, description: "Regular check-ups and vaccinations" },
      { name: "Child Plus", price: 150, description: "Includes specialist care and 24/7 nurse hotline" }
    ]
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
    membershipTier: "Basic",
    selected: false,
    dependents: [
      { id: "1-1", firstName: "Bob", lastName: "Johnson", relationship: "Spouse", dateOfBirth: "1983-07-22", sex: "Male", selected: false, membershipTier: "Basic" },
      { id: "1-2", firstName: "Charlie", lastName: "Johnson", relationship: "Child", dateOfBirth: "2010-11-05", sex: "Male", selected: false, membershipTier: "Basic" },
    ]
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
    membershipTier: "Standard",
    selected: false,
    dependents: [
      { id: "2-1", firstName: "Eva", lastName: "Smith", relationship: "Child", dateOfBirth: "2015-04-12", sex: "Female", selected: false, membershipTier: "Basic" },
    ]
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
    membershipTier: "Premium",
    selected: false,
    dependents: []
  },
]

export default function ProviderEnrollmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [selectAll, setSelectAll] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isEnrollmentComplete, setIsEnrollmentComplete] = useState(false)

  const filteredProviders = providers.filter(provider => 
    provider.practiceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleProviderExpansion = (providerId: string) => {
    setExpandedProvider(expandedProvider === providerId ? null : providerId)
  }

  const handleProviderSelection = (provider: Provider) => {
    setSelectedProvider(provider)
    setEmployees(initialEmployees.map(emp => ({...emp, selected: false, dependents: emp.dependents.map(dep => ({...dep, selected: false}))})))
    setSelectAll(false)
  }

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    setEmployees(employees.map(emp => ({
      ...emp,
      selected: newSelectAll,
      dependents: emp.dependents.map(dep => ({...dep, selected: newSelectAll}))
    })))
  }

  const toggleEmployeeSelection = (employeeId: string) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId 
        ? {...emp, selected: !emp.selected} 
        : emp
    ))
  }

  const toggleDependentSelection = (employeeId: string, dependentId: string) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId 
        ? {
            ...emp, 
            dependents: emp.dependents.map(dep => 
              dep.id === dependentId 
                ? {...dep, selected: !dep.selected} 
                : dep
            )
          } 
        : emp
    ))
  }

  const updateEmployeeMembershipTier = (employeeId: string, tier: string) => {
    setEmployees(employees.map(emp =>
      emp.id === employeeId
        ? { ...emp, membershipTier: tier }
        : emp
    ))
  }

  const updateDependentMembershipTier = (employeeId: string, dependentId: string, tier: string) => {
    setEmployees(employees.map(emp =>
      emp.id === employeeId
        ? {
            ...emp,
            dependents: emp.dependents.map(dep =>
              dep.id === dependentId
                ? { ...dep, membershipTier: tier }
                : dep
            )
          }
        : emp
    ))
  }

  useEffect(() => {
    const allSelected = employees.every(emp => emp.selected && emp.dependents.every(dep => dep.selected))
    setSelectAll(allSelected)
  }, [employees])

  const calculateTotalCost = () => {
    if (!selectedProvider) return { monthly: 0, yearly: 0 }
    
    const monthlyCost = employees.reduce((total, emp) => {
      if (emp.selected) {
        const employeeTier = selectedProvider.membershipTiers.find(tier => tier.name === emp.membershipTier)
        if (employeeTier) {
          total += employeeTier.price
        }
        
        emp.dependents.forEach(dep => {
          if (dep.selected) {
            const dependentTier = selectedProvider.membershipTiers.find(tier => tier.name === dep.membershipTier)
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
      yearly: monthlyCost * 12
    }
  }

  const { monthly, yearly } = calculateTotalCost()

  const handleCompleteEnrollment = async () => {
    // Here you would typically send the enrollment data to your backend
    // For this example, we'll simulate an API call with a timeout
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsEnrollmentComplete(true)
    setIsConfirmationOpen(false)
    toast({
      title: "Enrollment Completed",
      description: "Your enrollment has been successfully processed.",
      duration: 5000,
    })
  }

  if (isEnrollmentComplete) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Enrollment Complete</h1>
        <p className="text-xl mb-8">Thank you for enrolling with {selectedProvider?.practiceName}.</p>
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
        <h1 className="text-3xl font-bold">Enroll with Provider</h1>
        <Button asChild variant="outline">
          <Link href="/employer/enrollment">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Link>
        </Button>
      </div>

      {!selectedProvider && (
        <>
          <Card className="relative mb-6">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader>
              <CardTitle>Find a Provider</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search providers by name, specialty, or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="relative">
                <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">{provider.practiceName}</h3>
                      <p className="text-lg">{provider.doctorName}</p>
                      <p className="text-sm text-gray-500">{provider.specialty}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        {provider.address.street}, {provider.address.city}, {provider.address.state} {provider.address.zipCode}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Globe className="mr-1 h-4 w-4" />
                        <a href={`https://${provider.website}`} target="_blank" rel="noopener noreferrer">{provider.website}</a>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleProviderExpansion(provider.id)}
                      >
                        {expandedProvider === provider.id ? (
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
                      <Button onClick={() => handleProviderSelection(provider)}>Select Provider</Button>
                    </div>
                  </div>
                  {expandedProvider === provider.id && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Contact Information</h4>
                          <div className="space-y-1">
                            <p className="flex items-center text-sm">
                              <Mail className="mr-2 h-4 w-4" /> {provider.email}
                            </p>
                            <p className="flex items-center text-sm">
                              <Phone className="mr-2 h-4 w-4" /> {provider.phone}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Education and Experience</h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Medical School:</strong> {provider.education.medicalSchool.institution} ({provider.education.medicalSchool.graduationYear})</p>
                            <p><strong>Residency:</strong> {provider.education.residency.institution} ({provider.education.residency.graduationYear}) - {provider.education.residency.specialty}</p>
                            {provider.education.fellowship && (
                              <p><strong>Fellowship:</strong> {provider.education.fellowship.institution} ({provider.education.fellowship.graduationYear}) - {provider.education.fellowship.specialty}</p>
                            )}
                            <p><strong>Years of Experience:</strong> {provider.yearsOfExperience}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Membership Tiers</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {provider.membershipTiers.map((tier, index) => (
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

      {selectedProvider && (
        <Card className="relative">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
          <CardHeader>
            <CardTitle>Employee Roster for {selectedProvider.practiceName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectAll}
                  onCheckedChange={toggleSelectAll}
                />
                <label htmlFor="select-all">Select All</label>
              </div>
              <div>
                <p className="text-sm font-semibold">Total Monthly Cost: ${monthly}</p>
                <p className="text-sm font-semibold">Total Yearly Cost: ${yearly}</p>
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
                  <TableHead>Address</TableHead>
                  <TableHead>Apt/Suite</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>ZIP Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>DPC Provider</TableHead>
                  <TableHead>Membership Tier</TableHead>
                  <TableHead>Dependents</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <Checkbox
                        checked={employee.selected}
                        onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                      />
                    </TableCell>
                    <TableCell>{employee.firstName}</TableCell>
                    <TableCell>{employee.lastName}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.dateOfBirth}</TableCell>
                    <TableCell>{employee.sex}</TableCell>
                    <TableCell>{employee.address}</TableCell>
                    <TableCell>{employee.apartment}</TableCell>
                    <TableCell>{employee.city}</TableCell>
                    <TableCell>{employee.state}</TableCell>
                    <TableCell>{employee.zipCode}</TableCell>
                    <TableCell>{employee.status}</TableCell>
                    <TableCell>{employee.dpcProvider || "Not Assigned"}</TableCell>
                    <TableCell>
                      <Select
                        value={employee.membershipTier}
                        onValueChange={(value) => updateEmployeeMembershipTier(employee.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a tier" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedProvider.membershipTiers.map((tier) => (
                            <SelectItem key={tier.name} value={tier.name}>
                              {tier.name} (${tier.price}/month)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {employee.dependents.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">Select</TableHead>
                              <TableHead>First Name</TableHead>
                              <TableHead>Last Name</TableHead>
                              <TableHead>Relationship</TableHead>
                              <TableHead>Date of Birth</TableHead>
                              <TableHead>Sex</TableHead>
                              <TableHead>Membership Tier</TableHead>
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
                                <TableCell>
                                  <Select
                                    value={dependent.membershipTier}
                                    onValueChange={(value) => updateDependentMembershipTier(employee.id, dependent.id, value)}
                                  >
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Select a tier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {selectedProvider.membershipTiers.map((tier) => (
                                        <SelectItem key={tier.name} value={tier.name}>
                                          {tier.name} (${tier.price}/month)
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <span>No dependents</span>
                      )}
                    </TableCell>
                  </TableRow>
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
                    <DialogDescription>
                      Are you sure you want to complete the enrollment process?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p>Provider: {selectedProvider.practiceName}</p>
                    <p>Total Monthly Cost: ${monthly}</p>
                    <p>Total Yearly Cost: ${yearly}</p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCompleteEnrollment}>
                      Confirm Enrollment
                    </Button>
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

