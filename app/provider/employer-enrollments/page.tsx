"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Users, ChevronDown, ChevronUp, Building2, Briefcase, UserCheck, DollarSign } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

interface Dependent {
id: string
firstName: string
lastName: string
relationship: string
dateOfBirth: string
sex: "Male" | "Female" | "Other"
isEnrolled: boolean
membershipTier: string
monthlyFee: number
enrollmentDate: string
}

interface Employee {
id: string
firstName: string
lastName: string
email: string
phone: string
membershipTier: string
dependents: Dependent[]
startDate: string
dateOfBirth: string
sex: "Male" | "Female" | "Other"
monthlyFee: number
}

interface Enrollment {
id: string
employerName: string
broker: string
brokerEmail: string
brokerPhone: string
industry: string
address: {
street: string
city: string
state: string
zipCode: string
}
contactPerson: string
contactEmail: string
contactPhone: string
totalEmployees: number
employees: Employee[]
isExpanded: boolean
monthlyRevenue?: number; // Make monthlyRevenue optional
annualRevenue?: number; // Make annualRevenue optional
}

export default function EmployerEnrollmentsPage() {
const [enrollments, setEnrollments] = useState<Enrollment[]>([
{
  id: "1",
  employerName: "TechCorp Inc.",
  broker: "John Doe Insurance",
  brokerEmail: "john.doe@insurance.com",
  brokerPhone: "(555) 234-5678",
  industry: "Technology",
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "90210"
  },
  contactPerson: "John Smith",
  contactEmail: "john.smith@techcorp.com",
  contactPhone: "(555) 123-4567",
  totalEmployees: 100,
  isExpanded: false,
  employees: [
    {
      id: "e1",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@techcorp.com",
      phone: "(555) 111-2222",
      membershipTier: "Premium",
      startDate: "2023-06-01",
      dateOfBirth: "1988-07-22",
      sex: "Female",
      monthlyFee: 200,
      dependents: [
        { id: "d1", firstName: "Bob", lastName: "Johnson", relationship: "Spouse", dateOfBirth: "1983-07-22", sex: "Male", isEnrolled: true, membershipTier: "Premium", monthlyFee: 180, enrollmentDate: "2023-06-01" },
        { id: "d2", firstName: "Charlie", lastName: "Johnson", relationship: "Child", dateOfBirth: "2010-11-05", sex: "Male", isEnrolled: true, membershipTier: "Basic", monthlyFee: 50, enrollmentDate: "2023-06-01" },
      ]
    },
    {
      id: "e2",
      firstName: "David",
      lastName: "Smith",
      email: "david.smith@techcorp.com",
      phone: "(555) 333-4444",
      membershipTier: "Standard",
      startDate: "2023-06-15",
      dateOfBirth: "1981-03-15",
      sex: "Male",
      monthlyFee: 150,
      dependents: []
    }
  ],
  monthlyRevenue: 0,
  annualRevenue: 0
},
{
  id: "2",
  employerName: "HealthCare Solutions",
  broker: "Jane Smith Benefits",
  brokerEmail: "jane.smith@benefits.com",
  brokerPhone: "(555) 876-5432",
  industry: "Healthcare",
  address: {
    street: "456 Health Ave",
    city: "Medical City",
    state: "NY",
    zipCode: "10001"
  },
  contactPerson: "Sarah Johnson",
  contactEmail: "sarah.johnson@healthcare.com",
  contactPhone: "(555) 987-6543",
  totalEmployees: 75,
  isExpanded: false,
  employees: [
    {
      id: "e3",
      firstName: "Emma",
      lastName: "Davis",
      email: "emma.davis@healthcaresolutions.com",
      phone: "(555) 555-6666",
      membershipTier: "Premium",
      startDate: "2023-07-15",
      dateOfBirth: "1994-04-20",
      sex: "Female",
      monthlyFee: 200,
      dependents: [
        { id: "d3", firstName: "Frank", lastName: "Davis", relationship: "Child", dateOfBirth: "2018-03-10", sex: "Male", isEnrolled: true, membershipTier: "Basic", monthlyFee: 60, enrollmentDate: "2023-07-15" },
      ]
    }
  ],
  monthlyRevenue: 0,
  annualRevenue: 0
}
])

const toggleEmployerExpansion = (employerId: string) => {
setEnrollments(prevEnrollments =>
  prevEnrollments.map(enrollment =>
    enrollment.id === employerId
      ? { ...enrollment, isExpanded: !enrollment.isExpanded }
      : enrollment
  )
)
}

const removeEmployee = (employerId: string, employeeId: string) => {
setEnrollments(prevEnrollments =>
  prevEnrollments.map(enrollment => {
    if (enrollment.id === employerId) {
      const updatedEmployees = enrollment.employees.filter(emp => emp.id !== employeeId)
      const employeeToRemove = enrollment.employees.find(emp => emp.id === employeeId)

      // Check if updatedEmployees and employeeToRemove are defined before accessing properties
      return updatedEmployees && employeeToRemove ? {
        ...enrollment,
        employees: updatedEmployees,
        monthlyRevenue: (enrollment.monthlyRevenue || 0) - (employeeToRemove?.monthlyFee || 0),
        annualRevenue: (enrollment.annualRevenue || 0) - ((employeeToRemove?.monthlyFee || 0) * 12)
      } : enrollment // Return original enrollment if either is undefined
    }
    return enrollment // Return original enrollment if employerId doesn't match
  })
)
}

const removeDependent = (employerId: string, employeeId: string, dependentId: string) => {
setEnrollments(prevEnrollments =>
  prevEnrollments.map(enrollment => {
    if (enrollment.id === employerId && enrollment.employees) {
      const employeeIndex = enrollment.employees.findIndex(emp => emp.id === employeeId)
      if (employeeIndex !== -1) {
        const updatedDependents = enrollment.employees[employeeIndex].dependents.filter(dep => dep.id !== dependentId)
        const dependentToRemove = enrollment.employees[employeeIndex].dependents.find(dep => dep.id === dependentId)

        // Check if updatedDependents and dependentToRemove are defined before accessing properties
        return updatedDependents && dependentToRemove ? {
          ...enrollment,
          employees: enrollment.employees.map((emp, index) =>
            index === employeeIndex
              ? { ...emp, dependents: updatedDependents }
              : emp
          ),
          monthlyRevenue: (enrollment.monthlyRevenue || 0) - (dependentToRemove?.monthlyFee || 0),
          annualRevenue: (enrollment.annualRevenue || 0) - ((dependentToRemove?.monthlyFee || 0) * 12)
        } : enrollment // Return original enrollment if either is undefined
      }
    }
    return enrollment // Return original enrollment if employerId or employeeId doesn't match
  })
)
}

const totalEmployers = enrollments.length
const totalEnrollees = enrollments.reduce((sum, enrollment) =>
sum + enrollment.employees.length + enrollment.employees.reduce((depSum, emp) => depSum + emp.dependents.length, 0), 0
)
const totalMonthlyRevenue = enrollments.reduce((sum, enrollment) => sum + (enrollment.monthlyRevenue || 0), 0) 
const totalAnnualRevenue = enrollments.reduce((sum, enrollment) => sum + (enrollment.annualRevenue || 0), 0) 

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
    <h1 className="text-3xl font-bold">Client Roster</h1>
    <Button asChild variant="outline">
      <Link href="/provider/home">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Link>
    </Button>
  </div>

  <Card className="mb-8 relative">
    <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
    <CardHeader>
      <CardTitle>Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4"> {/* Removed revenue-related columns */}
        <div className="flex items-center">
          <Building2 className="h-5 w-5 text-blue-600 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Total Employers</p>
            <p className="text-xl font-semibold">{totalEmployers}</p>
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

  {enrollments.map((enrollment) => (
    <Card key={enrollment.id} className="mb-6">
      <CardHeader
        className="cursor-pointer flex flex-row justify-between relative"
        onClick={() => toggleEmployerExpansion(enrollment.id)}
      >
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
        <div className="space-y-2 w-full">
          <CardTitle className="text-2xl z-10">{enrollment.employerName}</CardTitle>
          <p className="text-gray-600">
            {enrollment.address.street}, {enrollment.address.city}, {enrollment.address.state} {enrollment.address.zipCode}
          </p>
          <p className="text-gray-600">
            Employees: {enrollment.totalEmployees} | Enrolled: {enrollment.employees.length} employees + {enrollment.employees.reduce((sum, emp) => sum + emp.dependents.filter(dep => dep.isEnrolled).length, 0)} dependents
          </p>
        </div>
        <Button variant="outline" size="sm" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
          More Info {enrollment.isExpanded ? <ChevronUp className="ml-2 h-4 w-4 text-white" /> : <ChevronDown className="ml-2 h-4 w-4 text-white" />}
        </Button>
      </CardHeader>
      {enrollment.isExpanded && (
        <CardContent>
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">Contact Information</p>
              <p>{enrollment.contactPerson}</p>
              <p>{enrollment.contactEmail}</p>
              <p>{enrollment.contactPhone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Broker</p>
              <p>{enrollment.broker}</p>
              <p>{enrollment.brokerEmail}</p>
              <p>{enrollment.brokerPhone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Industry</p>
              <p>{enrollment.industry}</p>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Sex</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Membership Tier</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Monthly Fee</TableHead>
                <TableHead>Dependents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollment.employees.map((employee) => (
                <React.Fragment key={employee.id}>
                  <TableRow key={employee.id}>
                    <TableCell>
                      {/*Removed Button for toggleEmployeeExpansion*/}
                    </TableCell>
                    <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                    <TableCell>{employee.dateOfBirth}</TableCell>
                    <TableCell>{employee.sex}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>{employee.membershipTier}</TableCell>
                    <TableCell>{employee.startDate}</TableCell>
                    <TableCell>${employee.monthlyFee}</TableCell>
                    <TableCell>{employee.dependents.length}</TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">Remove</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently remove the employee and all their dependents from the system.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => removeEmployee(enrollment.id, employee.id)}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                  {employee.dependents.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={11}>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Relationship</TableHead>
                              <TableHead>Date of Birth</TableHead>
                              <TableHead>Sex</TableHead>
                              <TableHead>Membership Tier</TableHead>
                              <TableHead>Monthly Fee</TableHead>
                              <TableHead>Enrollment Date</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {employee.dependents.map((dependent) => (
                              <TableRow key={dependent.id}>
                                <TableCell>{dependent.firstName} {dependent.lastName}</TableCell>
                                <TableCell>{dependent.relationship}</TableCell>
                                <TableCell>{dependent.dateOfBirth}</TableCell>
                                <TableCell>{dependent.sex}</TableCell>
                                <TableCell>{dependent.membershipTier}</TableCell>
                                <TableCell>${dependent.monthlyFee}</TableCell>
                                <TableCell>{dependent.enrollmentDate}</TableCell>
                                <TableCell>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive" size="sm">Remove</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This will permanently remove the dependent from the system.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => removeDependent(enrollment.id, employee.id, dependent.id)}>
                                          Continue
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  ))}
</div>
)
}

