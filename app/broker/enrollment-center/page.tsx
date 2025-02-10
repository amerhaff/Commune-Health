"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, Plus, Users, Clock, ChevronDown, ChevronUp, ChevronRight, Trash2, UserPlus, UserMinus } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { AddEmployerForm } from "@/components/add-employer-form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Import Select components
import { Badge } from "@/components/ui/badge"
import { usStates } from "@/utils/us-states"
import React from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { brokerApi } from "@/utils/broker-api-client"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorAlert } from "@/components/ui/error-alert"


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
  enrollmentDate: string
}

interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  sex: "Male" | "Female" | "Other"
  membershipTier: string
  monthlySubscription: number
  dpcPractice: string
  dependents: Dependent[]
  isExpanded?: boolean
  enrollmentDate: string
  status?: "Pending" | "Approved" | "Rejected"; // Added status field
}

interface Employer {
  id: string
  name: string
  industry: string // Keep industry
  address: { // Add address information
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contactPerson: { // Add contact person information
    name: string;
    email: string;
    phone: string;
  };
  // Remove enrolledCount and pendingCount
  revenue: number
  employees: Employee[]
  isExpanded?: boolean
}

interface EnrollmentRequest {
  id: string
  employerId: string
  employerName: string
  industry: string
  employeeCount: number
  address: string
  city: string
  state: string
  zipCode: string
  contactPerson: string
  contactEmail: string
  requestDate: string
  apartment?: string
}

interface CompletedEnrollment {
  id: string
  employerId: string
  employerName: string
  industry: string
  enrollees: number
  address: string
  city: string
  state: string
  zipCode: string
  contactPerson: string
  contactEmail: string
  apartment?: string
  employees: Employee[]
  isExpanded?: boolean
}

interface PendingEnrollment {
  employerName: string
  employerAddress: string
  contactPerson: {
    name: string
    phone: string
    email: string
  }
  employees: Employee[]
}

export default function EnrollmentCenterPage() {
  const [activeTab, setActiveTab] = useState("enroll-client")
  const [employers, setEmployers] = useState<Employer[]>([
    {
      id: "1",
      name: "TechCorp Inc.",
      industry: "Technology",
      address: { // Add address for TechCorp Inc.
        street: "123 Tech St",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
      },
      contactPerson: { // Add contact person for TechCorp Inc.
        name: "John Doe",
        email: "john@techcorp.com",
        phone: "555-1212",
      },
      revenue: 15000,
      employees: [
        { id: "1", firstName: "John", lastName: "Doe", email: "john@techcorp.com", dateOfBirth: "1985-05-15", sex: "Male", membershipTier: "Standard", monthlySubscription: 99, dpcPractice: "Default DPC Practice", enrollmentDate: "2023-01-15", status: "Approved", dependents: [
          { id: "1-1", firstName: "Jane", lastName: "Doe", relationship: "Spouse", dateOfBirth: "1987-03-20", sex: "Female", isEnrolled: true, membershipTier: "Standard", monthlySubscription: 99, enrollmentDate: "2023-01-15" },
          { id: "1-2", firstName: "Jimmy", lastName: "Doe", relationship: "Child", dateOfBirth: "2010-11-05", sex: "Male", isEnrolled: true, membershipTier: "Basic", monthlySubscription: 49, enrollmentDate: "2023-01-15" },
        ]},
        { id: "2", firstName: "Alice", lastName: "Smith", email: "alice@techcorp.com", dateOfBirth: "1990-08-22", sex: "Female", membershipTier: "Premium", monthlySubscription: 149, dpcPractice: "Default DPC Practice", enrollmentDate: "2023-02-01", status: "Approved", dependents: [] },
      ]
    },
    {
      id: "2",
      name: "HealthCare Solutions",
      industry: "Healthcare",
      address: { // Add address for HealthCare Solutions
        street: "456 Health Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
      },
      contactPerson: { // Add contact person for HealthCare Solutions
        name: "Jane Smith",
        email: "jane@healthcaresolutions.com",
        phone: "555-987-6543",
      },
      // Remove enrolledCount and pendingCount
      revenue: 22500,
      employees: [
        { id: "3", firstName: "Bob", lastName: "Johnson", email: "bob@healthcare.com", dateOfBirth: "1988-03-10", sex: "Male", membershipTier: "Basic", monthlySubscription: 79, dpcPractice: "Default DPC Practice", enrollmentDate: "2023-03-01", status: "Approved", dependents: [
          { id: "3-1", firstName: "Sarah", lastName: "Johnson", relationship: "Spouse", dateOfBirth: "1989-07-15", sex: "Female", isEnrolled: true, membershipTier: "Basic", monthlySubscription: 79, enrollmentDate: "2023-03-01" },
          { id: "3-2", firstName: "Tommy", lastName: "Johnson", relationship: "Child", dateOfBirth: "2012-04-30", sex: "Male", isEnrolled: true, membershipTier: "Basic", monthlySubscription: 39, enrollmentDate: "2023-03-01" },
        ]},
      ]
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeView, setActiveView] = useState<"enroll-client" | "enrollment-requests" | "completed-enrollments" | "pending-enrollments">("enroll-client")
  const [enrollmentRequests, setEnrollmentRequests] = useState<EnrollmentRequest[]>([
    {
      id: "1",
      employerId: "1",
      employerName: "TechCorp Inc.",
      industry: "Technology",
      employeeCount: 150,
      address: "123 Tech St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      contactPerson: "John Doe",
      contactEmail: "john@techcorp.com",
      requestDate: "2023-06-15"
    },
    {
      id: "2",
      employerId: "2",
      employerName: "HealthCare Solutions",
      industry: "Healthcare",
      employeeCount: 75,
      address: "456 Health Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      contactPerson: "Jane Smith",
      contactEmail: "jane@healthcaresolutions.com",
      requestDate: "2023-06-16"
    }
  ])
  const [completedEnrollments, setCompletedEnrollments] = useState<CompletedEnrollment[]>([
    {
      id: "1",
      employerId: "3",
      employerName: "EduLearn Systems",
      industry: "Education",
      enrollees: 180,
      address: "789 Learn Blvd",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      contactPerson: "Bob Johnson",
      contactEmail: "bob@edulearn.com",
      employees: [
        { id: "4", firstName: "Emma", lastName: "Davis", email: "emma@edulearn.com", dateOfBirth: "1982-09-15", sex: "Female", membershipTier: "Premium", monthlySubscription: 149, dpcPractice: "HealthFirst Clinic", enrollmentDate: "2023-05-01", status: "Approved", dependents: [
          { id: "4-1", firstName: "Liam", lastName: "Davis", relationship: "Child", dateOfBirth: "2010-03-20", sex: "Male", isEnrolled: true, membershipTier: "Basic", monthlySubscription: 49, enrollmentDate: "2023-05-01" },
        ]},
        { id: "5", firstName: "Michael", lastName: "Wilson", email: "michael@edulearn.com", dateOfBirth: "1975-11-30", sex: "Male", membershipTier: "Standard", monthlySubscription: 99, dpcPractice: "City Health Center", enrollmentDate: "2023-05-15", status: "Approved", dependents: [
          { id: "5-1", firstName: "Sophia", lastName: "Wilson", relationship: "Spouse", dateOfBirth: "1978-07-22", sex: "Female", isEnrolled: true, membershipTier: "Standard", monthlySubscription: 99, enrollmentDate: "2023-05-15" },
          { id: "5-2", firstName: "Oliver", lastName: "Wilson", relationship: "Child", dateOfBirth: "2008-12-05", sex: "Male", isEnrolled: true, membershipTier: "Basic", monthlySubscription: 49, enrollmentDate: "2023-05-15" },
        ]},
      ],
    }
  ])
  const [pendingEnrollments, setPendingEnrollments] = useState<PendingEnrollment[]>([
    {
      employerName: "Example Employer",
      employerAddress: "123 Main St, Anytown, CA 91234",
      contactPerson: {
        name: "Contact Name",
        phone: "555-123-4567",
        email: "contact@example.com",
      },
      employees: [
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          dateOfBirth: "1990-01-01",
          sex: "Male",
          membershipTier: "Standard",
          monthlySubscription: 99,
          dpcPractice: "HealthFirst Clinic",
          enrollmentDate: "2024-01-15",
          status: "Pending",
          dependents: [
            {
              id: "d1",
              firstName: "Jane",
              lastName: "Doe",
              relationship: "Spouse",
              dateOfBirth: "1992-02-01",
              sex: "Female",
              isEnrolled: false,
              membershipTier: "Standard",
              monthlySubscription: 99,
              enrollmentDate: "2024-01-15",
            },
          ],
          isExpanded: false,
        },
      ],
    },
  ])

  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    sex: "Other",
    membershipTier: "",
    monthlySubscription: 0,
    dpcPractice: "",
    dependents: [],
    enrollmentDate: "",
    status: "Pending",
  })

  const [enrollmentData, setEnrollmentData] = useState({
    pending_count: 0,
    enrollments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollmentData = async () => {
      try {
        const data = await brokerApi.getEnrollmentCenter('current');
        setEnrollmentData(data);
      } catch (err) {
        setError('Failed to fetch enrollment data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentData();
  }, []);

  const filteredEmployers = employers.filter(employer =>
    employer.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddEmployer = (newEmployer: Omit<Employer, "id" | "enrolledCount" | "pendingCount" | "revenue" | "employees">) => {
    const id = (employers.length + 1).toString()
    setEmployers([...employers, { ...newEmployer, id, enrolledCount: 0, pendingCount: 0, revenue: 0, employees: [] }])
    setIsDialogOpen(false)
    toast({
      title: "Employer Added",
      description: `${newEmployer.name} has been successfully added.`,
      duration: 3000,
    })
  }

  const handleCompletedEnrollment = (requestId: string, dpcPractice: string) => { // Added dpcPractice parameter
    const completedRequest = enrollmentRequests.find(request => request.id === requestId)
    if (completedRequest) {
      const newCompletedEnrollment: CompletedEnrollment = {
        ...completedRequest,
        enrollees: completedRequest.employeeCount,
        employees: [], // You may want to add actual employee data here
        dpcPractice: dpcPractice || "Default DPC Practice", // Added dpcPractice handling
      }
      setCompletedEnrollments([...completedEnrollments, newCompletedEnrollment])
      setEnrollmentRequests(prevRequests => prevRequests.filter(request => request.id !== requestId))
    }
    toast({
      title: "Enrollment Completed",
      description: "The enrollment has been successfully processed.",
      duration: 5000,
    })
  }

  const handleCancelRequest = (requestId: string) => {
    setEnrollmentRequests(prevRequests => prevRequests.filter(request => request.id !== requestId))
    toast({
      title: "Enrollment Request Cancelled",
      description: "The enrollment request has been cancelled.",
      duration: 3000,
    })
  }

  const toggleEnrollmentExpansion = (enrollmentId: string) => {
    setCompletedEnrollments(prevEnrollments =>
      prevEnrollments.map(enrollment =>
        enrollment.id === enrollmentId
          ? { ...enrollment, isExpanded: !enrollment.isExpanded }
          : enrollment
      )
    )
  }

  const toggleEmployeeExpansion = (enrollmentId: string, employeeId: string) => {
    setCompletedEnrollments(prevEnrollments =>
      prevEnrollments.map(enrollment =>
        enrollment.id === enrollmentId
          ? {
            ...enrollment,
            employees: enrollment.employees.map(employee =>
              employee.id === employeeId
                ? { ...employee, isExpanded: !employee.isExpanded }
                : employee
            )
          }
          : enrollment
      )
    )
  }

  const totalEnrollees = completedEnrollments.reduce((sum, enrollment) => sum + enrollment.enrollees, 0)

  const handleAddEnrollee = (employerIndex: number, employeeId?: string) => {
    const updatedPendingEnrollments = [...pendingEnrollments]
    const newEnrollee = {
      id: Date.now().toString(),
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      sex: "Other",
      membershipTier: "",
      monthlySubscription: 0,
      dpcPractice: "",
      enrollmentDate: "",
      dependents: [],
      isExpanded: false,
      status: "Pending",
    }

    if (employeeId) {
      updatedPendingEnrollments[employerIndex].employees = updatedPendingEnrollments[employerIndex].employees.map(emp =>
        emp.id === employeeId
          ? { ...emp, dependents: [...emp.dependents, newEnrollee] }
          : emp
      )
    } else {
      updatedPendingEnrollments[employerIndex].employees.push(newEnrollee)
    }

    setPendingEnrollments(updatedPendingEnrollments)
  }

  const handleRemoveEnrollee = (employerIndex: number, employeeId: string, dependentId?: string) => {
    const updatedPendingEnrollments = [...pendingEnrollments]

    if (dependentId) {
      updatedPendingEnrollments[employerIndex].employees = updatedPendingEnrollments[employerIndex].employees.map(emp =>
        emp.id === employeeId
          ? { ...emp, dependents: emp.dependents.filter(dep => dep.id !== dependentId) }
          : emp
      )
    } else {
      updatedPendingEnrollments[employerIndex].employees = updatedPendingEnrollments[employerIndex].employees.filter(emp => emp.id !== employeeId)
    }

    setPendingEnrollments(updatedPendingEnrollments)
  }

  const handleConfirmPendingEnrollments = () => {
    // Perform actions like updating enrollment status, sending confirmations, etc.
    console.log("Confirmed pending enrollments:", pendingEnrollments)
    toast({
      title: "Enrollments Confirmed",
      description: "Pending enrollments have been confirmed.",
    })
  }

  const handleEmployeeFieldUpdate = (employerIndex: number, employeeIndex: number, field: keyof Employee, value: any) => {
    setPendingEnrollments(prevEnrollments => {
      const updatedEnrollments = [...prevEnrollments];
      updatedEnrollments[employerIndex].employees[employeeIndex][field] = value;
      return updatedEnrollments;
    });
  };

  const handleDependentFieldUpdate = (employerIndex: number, employeeIndex: number, dependentIndex: number, field: keyof Dependent, value: any) => {
    setPendingEnrollments(prevEnrollments => {
      const updatedEnrollments = [...prevEnrollments];
      updatedEnrollments[employerIndex].employees[employeeIndex].dependents[dependentIndex][field] = value;
      return updatedEnrollments;
    });
  };

  const handleDependentDateOfBirthUpdate = (employerIndex: number, employeeIndex: number, dependentIndex: number, value: string) => {
    handleDependentFieldUpdate(employerIndex, employeeIndex, dependentIndex, "dateOfBirth", value);
  };

  const handleDependentSexUpdate = (employerIndex: number, employeeIndex: number, dependentIndex: number, value: "Male" | "Female" | "Other") => {
    handleDependentFieldUpdate(employerIndex, employeeIndex, dependentIndex, "sex", value);
  };

  // ... other functions

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

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
        <h1 className="text-3xl font-bold">DPC Enrollment Center</h1>
        <Button asChild variant="outline">
          <Link href="/broker/home">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <Button
          variant={activeView === "enroll-client" ? "default" : "outline"}
          onClick={() => setActiveView("enroll-client")}
          className="mr-2"
        >
          Enroll a Client
        </Button>
        <Button
          variant={activeView === "enrollment-requests" ? "default" : "outline"}
          onClick={() => setActiveView("enrollment-requests")}
          className="mr-2 relative"
        >
          Enrollment Requests
          {enrollmentRequests.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full h-3 w-3" />
          )}
        </Button>
        <Button
          variant={activeView === "pending-enrollments" ? "default" : "outline"}
          onClick={() => setActiveView("pending-enrollments")}
          className="mr-2 relative"
        >
          Pending Enrollments
          {employers.reduce((total, employer) => total + employer.pendingCount, 0) > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full h-3 w-3" />
          )}
        </Button>
        <Button
          variant={activeView === "completed-enrollments" ? "default" : "outline"}
          onClick={() => setActiveView("completed-enrollments")}
        >
          Completed Enrollments
        </Button>
      </div>

      {activeView === "enroll-client" && (
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-grow mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search employers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Employer</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new employer below.
                  </DialogDescription>
                </DialogHeader>
                <AddEmployerForm onSubmit={handleAddEmployer} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="mb-8 flex-grow overflow-auto">
            <h2 className="text-2xl font-semibold mb-4">Select an Employer to Enroll</h2>
            <div className="space-y-4">
              {filteredEmployers.map((employer) => (
                <Card key={employer.id} className="w-full relative"> {/* Added relative */}
                  <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div> {/* Blue strip */}
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold">{employer.name}</h3>
                      <p className="text-gray-600">Industry: {employer.industry}</p>
                      <p className="text-gray-600">Address: {employer.address.street}, {employer.address.city}, {employer.address.state} {employer.address.zipCode}</p>
                      <p className="text-gray-600">
                        Contact Person: {employer.contactPerson.name} ({employer.contactPerson.email}) - {employer.contactPerson.phone}
                      </p>
                      {/* Remove enrolled/pending counts */}
                      {/* <p className="text-gray-600">Total Employees: {employer.enrolledCount + employer.pendingCount}</p> */}
                      {/* <p className="text-gray-600">Enrolled: {employer.enrolledCount} | Pending: {employer.pendingCount}</p> */}
                    </div>
                    <div className="flex items-center justify-end w-1/4">
                      <Button asChild className="w-full">
                        <Link href={`/broker/enrollment-center/${employer.id}`}>
                          Select
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === "enrollment-requests" && (
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold mb-4">Enrollment Requests ({enrollmentRequests.length})</h2>
          {enrollmentRequests.length > 0 ? (
            <div className="space-y-4">
              {enrollmentRequests.map((request) => (
                <Card key={request.id} className="w-full relative"> {/* Added relative */}
                  <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div> {/* Blue strip */}
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold">{request.employerName}</h3>
                      <p className="text-gray-600">Industry: {request.industry}</p>
                      <p className="text-gray-600">Total Employees: {request.employeeCount}</p>
                      <p className="text-gray-600">Address: {request.address}
                        {request.apartment && `, ${request.apartment}`}
                        , {request.city}, {request.state} {request.zipCode}
                      </p>
                      <p className="text-gray-600">Contact: {request.contactPerson} ({request.contactEmail})</p>
                      <p className="text-gray-600">Request Date: {request.requestDate}</p>
                    </div>
                    <div className="flex flex-col items-end justify-end space-y-2">
                      <Button asChild className="w-full">
                        <Link href={`/broker/enrollment-center/${request.employerId}`}>
                          Complete Enrollment
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => handleCancelRequest(request.id)}
                      >
                        Cancel Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No pending enrollment requests at this time.</p>
          )}
        </div>
      )}

      {activeView === "completed-enrollments" && (
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold mb-4">Completed Enrollments</h2>
          <div className="mb-4">
            <p className="text-lg font-semibold">Total Clients: {completedEnrollments.length}</p>
            <p className="text-lg font-semibold">Total Enrollees: {totalEnrollees}</p>
          </div>
          {completedEnrollments.length > 0 ? (
            <div className="space-y-4">
              {completedEnrollments.map((enrollment) => (
                <Card key={enrollment.id} className="w-full relative"> {/* Added relative */}
                  <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div> {/* Blue strip */}
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{enrollment.employerName}</h3>
                        <p className="text-gray-600">Industry: {enrollment.industry}</p>
                        <p className="text-gray-600">Enrollees: {enrollment.enrollees}</p>
                        <p className="text-gray-600">Address: {enrollment.address}
                          {enrollment.apartment && `, ${enrollment.apartment}`}
                          , {enrollment.city}, {enrollment.state} {enrollment.zipCode}
                        </p>
                        <p className="text-gray-600">Contact: {enrollment.contactPerson} ({enrollment.contactEmail})</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => toggleEnrollmentExpansion(enrollment.id)}
                      className="w-full justify-between"
                    >
                      {enrollment.isExpanded ? "Hide" : "Show"} Enrollee List
                      {enrollment.isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                    </Button>
                    {enrollment.isExpanded && (
                      <div className="mt-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead></TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Date of Birth</TableHead>
                              <TableHead>Sex</TableHead>
                              <TableHead>DPC Practice</TableHead>
                              <TableHead>Membership Tier</TableHead>
                              <TableHead>Enrollment Date</TableHead>
                              <TableHead>Monthly Subscription</TableHead>
                              <TableHead>Dependents</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {enrollment.employees.map((employee) => (
                              <React.Fragment key={employee.id}>
                                <TableRow>
                                  <TableCell>
                                    {employee.dependents.length > 0 && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="p-0"
                                        onClick={() => toggleEmployeeExpansion(enrollment.id, employee.id)}
                                      >
                                        {employee.isExpanded ? (
                                          <ChevronDown className="h-4 w-4" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4" />
                                        )}
                                      </Button>
                                    )}
                                  </TableCell>
                                  <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                                  <TableCell>{employee.dateOfBirth}</TableCell>
                                  <TableCell>{employee.sex}</TableCell>
                                  <TableCell>{employee.dpcPractice}</TableCell>
                                  <TableCell>{employee.membershipTier}</TableCell>
                                  <TableCell>{employee.enrollmentDate}</TableCell>
                                  <TableCell>${employee.monthlySubscription}</TableCell>
                                  <TableCell>{employee.dependents.length}</TableCell>
                                </TableRow>
                                {employee.isExpanded && (
                                  <TableRow>
                                    <TableCell colSpan={10}>
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Relationship</TableHead>
                                            <TableHead>Date of Birth</TableHead>
                                            <TableHead>Sex</TableHead>
                                            <TableHead>DPC Practice</TableHead>
                                            <TableHead>Membership Tier</TableHead>
                                            <TableHead>Monthly Subscription</TableHead>
                                            <TableHead>Enrollment Date</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {employee.dependents.map((dependent) => (
                                            <TableRow key={dependent.id}>
                                              <TableCell>{dependent.firstName} {dependent.lastName}</TableCell>
                                              <TableCell>{dependent.relationship}</TableCell>
                                              <TableCell>{dependent.dateOfBirth}</TableCell>
                                              <TableCell>{dependent.sex}</TableCell>
                                              <TableCell>{employee.dpcPractice}</TableCell>
                                              <TableCell>{dependent.membershipTier}</TableCell>
                                              <TableCell>${dependent.monthlySubscription}</TableCell>
                                              <TableCell>{dependent.enrollmentDate}</TableCell>
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
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No completed enrollments to display.</p>
          )}
        </div>
      )}

      {activeView === "pending-enrollments" && (
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold mb-4">Pending Enrollments</h2>
          {pendingEnrollments.map((enrollment, employerIndex) => (
            <Card key={employerIndex} className="w-full relative"> {/* Added relative */}
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div> {/* Blue strip */}
              <CardHeader>
                <CardTitle>
                  {enrollment.employerName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm font-medium">Employer Details:</p>
                  <p className="text-sm">{enrollment.employerAddress}</p>
                  <p className="text-sm">
                    Contact: {enrollment.contactPerson.name} ({enrollment.contactPerson.phone}) -{" "}
{enrollment.contactPerson.email}
                  </p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date of Birth</TableHead>
                      <TableHead>Sex</TableHead>
                      <TableHead>DPC Provider</TableHead>
                      <TableHead>Membership Tier</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Dependents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollment.employees.map((employee, employeeIndex) => (
                      <React.Fragment key={employee.id}>
                        <TableRow>
                          <TableCell>
                            <Input
                              type="text"
                              value={employee.firstName}
                              onChange={(e) => handleEmployeeFieldUpdate(                              employerIndex, employeeIndex, "firstName", e.target.value)}
                            />
                            <Input
                              type="text"
                              value={employee.lastName}
                              onChange={(e) => handleEmployeeFieldUpdate(employerIndex, employeeIndex, "lastName", e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="text"
                              value={employee.dateOfBirth}
                              onChange={(e) => handleEmployeeFieldUpdate(employerIndex, employeeIndex, "dateOfBirth", e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Select value={employee.sex} onChange={(e) => handleEmployeeFieldUpdate(employerIndex, employeeIndex, "sex", e.target.value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Sex" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="text"
                              value={employee.dpcPractice}
                              onChange={(e) => handleEmployeeFieldUpdate(employerIndex, employeeIndex, "dpcPractice", e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Select value={employee.membershipTier} onChange={(e) => handleEmployeeFieldUpdate(employerIndex, employeeIndex, "membershipTier", e.target.value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Tier" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Basic">Basic</SelectItem>
                                <SelectItem value="Standard">Standard</SelectItem>
                                <SelectItem value="Premium">Premium</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={employee.monthlySubscription}
                              onChange={(e) => handleEmployeeFieldUpdate(employerIndex, employeeIndex, "monthlySubscription", parseInt(e.target.value, 10))}
                            />
                          </TableCell>
                          <TableCell>{employee.dependents.length}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" onClick={() => handleAddEnrollee(employerIndex, employee.id)}>Add Dependent</Button>
                              <Button size="sm" variant="destructive" onClick={() => handleRemoveEnrollee(employerIndex, employee.id)}>Remove</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {employee.dependents.map((dependent, dependentIndex) => (
                          <TableRow key={dependent.id} className="bg-gray-100 border-b"> {/* Added border for better visibility */}
                            <TableCell className="pl-8">
                              <Input
                                type="text"
                                value={dependent.firstName}
                                onChange={(e) => handleDependentFieldUpdate(employerIndex, employeeIndex, dependentIndex, "firstName", e.target.value)}
                              />
                              <Input
                                type="text"
                                value={dependent.lastName}
                                onChange={(e) => handleDependentFieldUpdate(employerIndex, employeeIndex, dependentIndex, "lastName", e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="date"
                                value={dependent.dateOfBirth}
                                onChange={(e) => handleDependentDateOfBirthUpdate(employerIndex, employeeIndex, dependentIndex, e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                value={dependent.sex}
                                onChange={(e) =>
                                  handleDependentSexUpdate(
                                    employerIndex,
                                    employeeIndex,
                                    dependentIndex,
                                    e.target.value as "Male" | "Female" | "Other"
                                  )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Sex" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Male">Male</SelectItem>
                                  <SelectItem value="Female">Female</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="text"
                                value={dependent.dpcPractice}
                                onChange={(e) => handleDependentFieldUpdate(employerIndex, employeeIndex, dependentIndex, "dpcPractice", e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Select value={dependent.membershipTier} onChange={(e) => handleDependentFieldUpdate(employerIndex, employeeIndex, dependentIndex, "membershipTier", e.target.value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Tier" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Basic">Basic</SelectItem>
                                  <SelectItem value="Standard">Standard</SelectItem>
                                  <SelectItem value="Premium">Premium</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={dependent.monthlySubscription}
                                onChange={(e) => handleDependentFieldUpdate(employerIndex, employeeIndex, dependentIndex, "monthlySubscription", parseInt(e.target.value, 10))}
                              />
                            </TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>
                              <Button size="sm" variant="destructive" onClick={() => handleRemoveEnrollee(employerIndex, employee.id, dependent.id)}>Remove</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-start">
                  <Button onClick={() => handleAddEnrollee(employerIndex)}>Add Employee</Button>
                  <Button onClick={handleConfirmPendingEnrollments} className="ml-auto">
                    Confirm Enrollments
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

