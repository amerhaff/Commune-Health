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
import { ArrowLeft, Check, ChevronDown, ChevronUp } from 'lucide-react'
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import { brokerApi } from "@/utils/broker-api-client"

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

export default function SubmitRosterPage({ params }: { params: { brokerId: string } }) {
const [expandedProvider, setExpandedProvider] = useState<string | null>(null)
const [selectedProvider, setSelectedProvider] = useState<Provider | null>(providers[0]);
const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
const [selectAll, setSelectAll] = useState(false)
const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
const [isEnrollmentComplete, setIsEnrollmentComplete] = useState(false)
const [expandedEmployeeIds, setExpandedEmployeeIds] = useState<string[]>([]);


const toggleProviderExpansion = (providerId: string) => {
setExpandedProvider(expandedProvider === providerId ? null : providerId)
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

const toggleEmployeeExpansion = (employeeId: string) => {
setExpandedEmployeeIds(prevIds =>
  prevIds.includes(employeeId)
    ? prevIds.filter(id => id !== employeeId)
    : [...prevIds, employeeId]
);
};

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

const toggleDependentSelection = (employeeId: string, dependentId: string) => {
setEmployees(employees.map(emp =>
  emp.id === employeeId
    ? {
        ...emp,
        dependents: emp.dependents.map(dep =>
          dep.id === dependentId
            ? { ...dep, selected: !dep.selected }
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


const handleSubmitRoster = async () => {
  try {
    // Format employee data for quote request
    const employeeData = employees.filter(emp => emp.selected).map(emp => ({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      dateOfBirth: emp.dateOfBirth,
      sex: emp.sex,
      dependents: emp.dependents
        .filter(dep => dep.selected)
        .map(dep => ({
          firstName: dep.firstName,
          lastName: dep.lastName,
          relationship: dep.relationship,
          dateOfBirth: dep.dateOfBirth,
          sex: dep.sex
        }))
    }));

    await brokerApi.createQuoteRequest(params.brokerId, {
      employee_data: employeeData
    });

    setIsEnrollmentComplete(true);
    toast({
      title: "Quote Request Submitted",
      description: "Your roster has been sent to the broker for review.",
      duration: 5000,
    });
  } catch (error) {
    console.error('Error submitting roster:', error);
    toast({
      title: "Failed to submit roster",
      description: "Please try again or contact support if the problem persists.",
      variant: "destructive",
    });
  }
};

if (isEnrollmentComplete) {
return (
  <div className="container mx-auto px-4 py-8 text-center">
    <h1 className="text-3xl font-bold mb-4">Quote Request Complete</h1>
    <p className="text-xl mb-8">Your request for a quote has been submitted.  We will contact you shortly with the details.</p>
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
        <div className="mb-4 flex items-center space-x-2">
          <Checkbox
            checked={selectAll}
            onCheckedChange={toggleSelectAll}
          />
          <p>Select All</p>
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
              <TableHead>Dependents</TableHead>
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
                  <TableCell>
                    {employee.dependents.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">Select</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Email</TableHead>
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
                    ) : (
                      <span>No dependents</span>
                    )}
                  </TableCell>
                </TableRow>
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
                <DialogDescription>
                  Are you sure you want to request a quote?
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {/* <p>Provider: {selectedProvider.practiceName}</p>
                <p>Total Monthly Cost: ${monthly}</p>
                <p>Total Yearly Cost: ${yearly}</p> */}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitRoster}>
                  Confirm Request
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

