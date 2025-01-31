"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { Plus, UserMinus, Users, ChevronRight, ChevronDown, ArrowLeft, Building2, DollarSign, Phone, Mail, MapPin } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface MonthlySpend {
  month: string
  amount: number
  employees: number
  dependents: number
}

interface Dependent {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
  sex: "Male" | "Female" | "Other";
  isEnrolled: boolean;
  membershipAmount?: number;
  dpcProvider: string;
  membershipTier: string;
  enrollmentDate?: string;
}

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  sex: "Male" | "Female" | "Other";
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  status: "Not Enrolled" | "Enrolled" | "Pending";
  dpcProvider: string;
  membershipTier: string;
  isExpanded: boolean;
  dependents: Dependent[];
  membershipAmount?: number;
  enrollmentDate?: string;
}

export default function EmployeeRosterPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      dateOfBirth: "1985-05-15",
      sex: "Male",
      address: "123 Main St",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      status: "Enrolled",
      dpcProvider: "HealthFirst Clinic",
      membershipTier: "Standard",
      isExpanded: false,
      dependents: [
        { id: "1-1", firstName: "Jane", lastName: "Doe", relationship: "Spouse", dateOfBirth: "1987-03-20", sex: "Female", isEnrolled: true, membershipAmount: 100, dpcProvider: "HealthFirst Clinic", membershipTier: "Standard", enrollmentDate: "2023-10-26" },
        { id: "1-2", firstName: "Jimmy", lastName: "Doe", relationship: "Child", dateOfBirth: "2010-11-05", sex: "Male", isEnrolled: true, membershipAmount: 50, dpcProvider: "HealthFirst Clinic", membershipTier: "Standard", enrollmentDate: "2023-10-26" },
      ],
      membershipAmount: 200,
      enrollmentDate: "2023-10-26",
    },
    {
      id: "2",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      dateOfBirth: "1990-08-22",
      sex: "Female",
      address: "456 Elm St",
      apartment: "",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      status: "Not Enrolled",
      dpcProvider: "",
      membershipTier: "",
      isExpanded: false,
      dependents: [],
    },
    {
      id: "3",
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob@example.com",
      dateOfBirth: "1988-12-10",
      sex: "Male",
      address: "789 Oak St",
      apartment: "Suite 10",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      status: "Enrolled",
      dpcProvider: "City Health Clinic",
      membershipTier: "Basic",
      isExpanded: false,
      dependents: [],
      membershipAmount: 150,
      enrollmentDate: "2024-01-15",
    },
  ])

  const [enrollmentFigures, setEnrollmentFigures] = useState({
    totalEmployees: 0,
    enrolledEmployees: 0,
    unenrolledEmployees: 0,
    enrolledDependents: 0,
    totalEnrollees: 0,
  })

  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id' | 'isExpanded' | 'dependents'>>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    sex: "Other",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    status: "Not Enrolled",
    dpcProvider: "",
    membershipTier: "",
    enrollmentDate: "",
  })

  const [newDependent, setNewDependent] = useState<Omit<Dependent, 'id'>>({
    firstName: "",
    lastName: "",
    relationship: "",
    dateOfBirth: "",
    sex: "Other",
    isEnrolled: false,
    dpcProvider: "",
    membershipTier: "",
    enrollmentDate: "",
  })

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
  const [activeSubTab, setActiveSubTab] = useState<"enrollee-list" | "healthcare-spend" | "monthly-breakdown" | "transactions">("enrollee-list")

  const monthlyData = useMemo<MonthlySpend[]>(() => {
    const monthlySpend: MonthlySpend[] = [
      { month: "January", amount: 12000, employees: 100, dependents: 20 },
      { month: "February", amount: 12500, employees: 105, dependents: 20 },
      { month: "March", amount: 13000, employees: 110, dependents: 20 },
      { month: "April", amount: 12800, employees: 108, dependents: 20 },
      { month: "May", amount: 13200, employees: 112, dependents: 20 },
      { month: "June", amount: 13500, employees: 115, dependents: 20 },
      { month: "July", amount: 13800, employees: 118, dependents: 20 },
      { month: "August", amount: 14000, employees: 120, dependents: 20 },
      { month: "September", amount: 14200, employees: 122, dependents: 20 },
      { month: "October", amount: 14500, employees: 125, dependents: 20 },
      { month: "November", amount: 14700, employees: 127, dependents: 20 },
      { month: "December", amount: 15000, employees: 130, dependents: 20 },
    ]
    return monthlySpend;
  }, [])

  const annualTotal = useMemo(() => {
    return monthlyData.reduce((total, month) => total + month.amount, 0)
  }, [monthlyData])

  const yearToDateTotal = useMemo(() => {
    const currentMonthIndex = new Date().getMonth(); // 0-indexed (0 = January, 11 = December)
    return monthlyData.slice(0, currentMonthIndex + 1).reduce((total, month) => total + month.amount, 0);
  }, [monthlyData])

  const totalEmployeesEnrolled = useMemo(() => {
    return monthlyData.reduce((total, month) => total + month.employees, 0)
  }, [monthlyData])

  const totalDependentsEnrolled = useMemo(() => {
    return monthlyData.reduce((total, month) => total + month.dependents, 0)
  }, [monthlyData])

  const totalEnrollees = useMemo(() => {
    return totalEmployeesEnrolled + totalDependentsEnrolled
  }, [totalEmployeesEnrolled, totalDependentsEnrolled])

  const chartData = useMemo(() => {
    return monthlyData.map(data => ({
      name: data.month,
      amount: data.amount
    }))
  }, [monthlyData])

  const [selectedMonth, setSelectedMonth] = useState("December")
  const [selectedYear, setSelectedYear] = useState("2023")
  const years = ["2021", "2022", "2023"]

  const currentMonthData = useMemo(() => {
    return monthlyData.find(data => data.month === selectedMonth)
  }, [selectedMonth, monthlyData])

  useEffect(() => {
    const figures = employees.reduce((acc, employee) => {
      acc.totalEmployees++;
      if (employee.status === "Enrolled") {
        acc.enrolledEmployees++;
        acc.enrolledDependents += employee.dependents.filter(d => d.isEnrolled).length;
      } else {
        acc.unenrolledEmployees++;
      }
      return acc;
    }, { totalEmployees: 0, enrolledEmployees: 0, unenrolledEmployees: 0, enrolledDependents: 0 });

    figures.totalEnrollees = figures.enrolledEmployees + figures.enrolledDependents;
    setEnrollmentFigures(figures);
  }, [employees]);


  const toggleEmployeeExpansion = (employeeId: string) => {
    setEmployees(prevEmployees => prevEmployees.map(emp =>
      emp.id === employeeId ? { ...emp, isExpanded: !emp.isExpanded } : emp
    ))
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

  const handleAddEmployee = () => {
    const newEmployeeId = (employees.length + 1).toString()
    const employeeToAdd: Employee = {
      ...newEmployee,
      id: newEmployeeId,
      isExpanded: false,
      dependents: [],
      enrollmentDate: "",
    }
    setEmployees([...employees, employeeToAdd])
    setNewEmployee({
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      sex: "Other",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      status: "Not Enrolled",
      dpcProvider: "",
      membershipTier: "",
      enrollmentDate: "",
    })
    toast({
      title: "Employee Added",
      description: `${newEmployee.firstName} ${newEmployee.lastName} has been added to the roster.`,
    })
  }

  const handleRemoveEmployee = (employeeId: string) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId))
    toast({
      title: "Employee Removed",
      description: "The employee has been removed from the roster.",
    })
  }

  const handleAddDependent = () => {
    if (selectedEmployeeId) {
      const newDependentId = Date.now().toString()
      const employee = employees.find(emp => emp.id === selectedEmployeeId);
      setEmployees(employees.map(emp =>
        emp.id === selectedEmployeeId
          ? {
            ...emp,
            dependents: [
              ...emp.dependents,
              {
                ...newDependent,
                id: newDependentId,
                dpcProvider: employee?.dpcProvider || "",
                membershipTier: employee?.membershipTier || "",
              },
            ],
          }
          : emp
      ))
      setNewDependent({
        firstName: "",
        lastName: "",
        relationship: "",
        dateOfBirth: "",
        sex: "Other",
        isEnrolled: false,
        dpcProvider: "",
        membershipTier: "",
        enrollmentDate: "",
      })
      toast({
        title: "Dependent Added",
        description: `${newDependent.firstName} ${newDependent.lastName} has been added as a dependent.`,
      })
    }
  }

  const handleRemoveDependent = (employeeId: string, dependentId: string) => {
    setEmployees(employees.map(emp =>
      emp.id === employeeId
        ? { ...emp, dependents: emp.dependents.filter(dep => dep.id !== dependentId) }
        : emp
    ))
    toast({
      title: "Dependent Removed",
      description: "The dependent has been removed.",
    })
  }

  const [transactions, setTransactions] = useState([
    { id: "TRX001", date: "2024-05-03", enrolleeName: "John Smith", employerName: "TechCorp Inc.", broker: "Jane Doe", amount: 1500, status: "Completed" },
    { id: "TRX002", date: "2024-05-04", enrolleeName: "Alice Johnson", employerName: "TechCorp Inc.", broker: "John Doe", amount: 2000, status: "Pending" },
    { id: "TRX003", date: "2024-05-05", enrolleeName: "Bob Williams", employerName: "TechCorp Inc.", broker: "Peter Jones", amount: 1200, status: "Completed" },
  ])

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

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employer Name</h1>
        <Button asChild variant="outline">
          <Link href="/admin/account-management">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Link>
        </Button>
      </div>
      <Card className="mb-8 relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
         <div>
  {/* Contact Information Section */}
  <div className="mb-4">
    <p className="text-sm font-medium">Contact Information:</p>
    <div className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
      <MapPin className="h-4 w-4" />
      <p>{'Address Placeholder'}</p> {/* Replace with actual address data */}
    </div>
    <div className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
      <Phone className="h-4 w-4" />
      <p>{'Phone Placeholder'}</p> {/* Replace with actual phone data */}
    </div>
    <div className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
      <Mail className="h-4 w-4" />
      <p>{'Email Placeholder'}</p> {/* Replace with actual email data */}
    </div>
  </div>

  {/* Total Employees and Enrollees Section */}
  <div className="grid grid-cols-2 gap-4">
    <div>
      <p className="text-sm text-muted-foreground">Total Employees</p>
      <p className="text-2xl font-bold">{enrollmentFigures.totalEmployees}</p>
      <div className="mt-2 space-y-1">
        <p className="text-sm text-muted-foreground">
          Enrolled Employees: <span className="font-semibold">{enrollmentFigures.enrolledEmployees}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Unenrolled Employees: <span className="font-semibold">{enrollmentFigures.unenrolledEmployees}</span>
        </p>
      </div>
    </div>
    <div>
      <p className="text-sm text-muted-foreground">Total Enrollees</p>
      <p className="text-2xl font-bold">{enrollmentFigures.totalEnrollees}</p>
      <div className="mt-2 space-y-1">
        <p className="text-sm text-muted-foreground">
          Enrolled Employees: <span className="font-semibold">{enrollmentFigures.enrolledEmployees}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Enrolled Dependents: <span className="font-semibold">{enrollmentFigures.enrolledDependents}</span>
        </p>
      </div>
    </div>
  </div>
</div>
        </CardContent>
      </Card>

      <Card className="relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
        <CardHeader>
          <CardTitle>Employer Spend Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="enrollee-list" className="w-full mb-4" onValueChange={setActiveSubTab}>
            <TabsList>
              <TabsTrigger value="enrollee-list" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>Enrollee List</TabsTrigger>
              <TabsTrigger value="healthcare-spend" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>Healthcare Spend</TabsTrigger>
              <TabsTrigger value="monthly-breakdown" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>Monthly Breakdown</TabsTrigger>
              <TabsTrigger value="transactions" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="enrollee-list">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]"></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date of Birth</TableHead>
                      <TableHead>Sex</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>DPC Provider</TableHead>
                      <TableHead>Membership Tier</TableHead>
                      <TableHead>Membership Amount</TableHead>
                      <TableHead>Enrollment Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <React.Fragment key={employee.id}>
                        <TableRow>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0"
                              onClick={() => toggleEmployeeExpansion(employee.id)}
                            >
                              {employee.isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>{employee.dateOfBirth}</TableCell>
                          <TableCell>{employee.sex}</TableCell>
                          <TableCell>{getStatusBadge(employee.status)}</TableCell>
                          <TableCell>{employee.dpcProvider || "Not Assigned"}</TableCell>
                          <TableCell>{employee.membershipTier || "Not Assigned"}</TableCell>
                          <TableCell>{employee.status === "Enrolled" ? `$${employee.membershipAmount || 0}` : "N/A"}</TableCell>
                          <TableCell>{employee.enrollmentDate || "N/A"}</TableCell>
                          <TableCell>
                            <Button variant="destructive" size="sm" onClick={() => handleRemoveEmployee(employee.id)}>
                              <UserMinus className="mr-2 h-4 w-4" />
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                        {employee.isExpanded && (
                          <TableRow>
                            <TableCell colSpan={11}>
                              <div className="pl-8">
                                <h4 className="font-semibold mb-2">Dependents</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Name</TableHead>
                                      <TableHead>Relationship</TableHead>
                                      <TableHead>Date of Birth</TableHead>
                                      <TableHead>Sex</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead>DPC Provider</TableHead>
                                      <TableHead>Membership Tier</TableHead>
                                      <TableHead>Membership Amount</TableHead>
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
                                        <TableCell>
                                          {dependent.isEnrolled ? (
                                            <Badge className="bg-green-500 hover:bg-green-600">Enrolled</Badge>
                                          ) : (
                                            <Badge variant="destructive">Not Enrolled</Badge>
                                          )}
                                        </TableCell>
                                        <TableCell>{dependent.dpcProvider}</TableCell>
                                        <TableCell>{dependent.membershipTier}</TableCell>
                                        <TableCell>{dependent.isEnrolled ? `$${dependent.membershipAmount || 0}` : "N/A"}</TableCell>
                                        <TableCell>{dependent.enrollmentDate || "N/A"}</TableCell>
                                        <TableCell>
                                          <Button variant="destructive" size="sm" onClick={() => handleRemoveDependent(employee.id, dependent.id)}>
                                            <UserMinus className="mr-2 h-4 w-4" />
                                            Remove
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                                <div className="mt-4">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button onClick={() => setSelectedEmployeeId(employee.id)}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Dependent
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Add New Dependent</DialogTitle>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="firstName" className="text-right">
                                            First Name
                                          </Label>
                                          <Input
                                            id="firstName"
                                            value={newDependent.firstName}
                                            onChange={(e) => setNewDependent({ ...newDependent, firstName: e.target.value })}
                                            className="col-span-3"
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="lastName" className="text-right">
                                            Last Name
                                          </Label>
                                          <Input
                                            id="lastName"
                                            value={newDependent.lastName}
                                            onChange={(e) => setNewDependent({ ...newDependent, lastName: e.target.value })}
                                            className="col-span-3"
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="relationship" className="text-right">
                                            Relationship
                                          </Label>
                                          <Input
                                            id="relationship"
                                            value={newDependent.relationship}
                                            onChange={(e) => setNewDependent({ ...newDependent, relationship: e.target.value })}
                                            className="col-span-3"
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="dateOfBirth" className="text-right">
                                            Date of Birth
                                          </Label>
                                          <Input
                                            id="dateOfBirth"
                                            type="date"
                                            value={newDependent.dateOfBirth}
                                            onChange={(e) => setNewDependent({ ...newDependent, dateOfBirth: e.target.value })}
                                            className="col-span-3"
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="sex" className="text-right">
                                            Sex
                                          </Label>
                                          <Select
                                            value={newDependent.sex}
                                            onValueChange={(value) => setNewDependent({ ...newDependent, sex: value as "Male" | "Female" | "Other" })}
                                          >
                                            <SelectTrigger className="col-span-3">
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
                                          <Label htmlFor="enrollmentDate" className="text-right">
                                            Enrollment Date
                                          </Label>
                                          <Input
                                            id="enrollmentDate"
                                            type="date"
                                            value={newDependent.enrollmentDate}
                                            onChange={(e) => setNewDependent({ ...newDependent, enrollmentDate: e.target.value })}
                                            className="col-span-3"
                                          />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button onClick={handleAddDependent}>Add Dependent</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="healthcare-spend">
              <div>
                <Card className="relative">
                  <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
                  <CardHeader>
                    <CardTitle>Healthcare Spend Trends</CardTitle>
                    <CardDescription>
                      Annual overview of healthcare spending
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6 mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center">
                          <div>
                            <p className="text-sm text-gray-500">Total Spend</p>
                            <p className="text-xl font-semibold">${annualTotal.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div>
                            <p className="text-sm text-gray-500">Year-to-Date Spend</p>
                            <p className="text-xl font-semibold">${yearToDateTotal.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center">
                          <div>
                            <p className="text-sm text-gray-500">Total Enrollees</p>
                            <p className="text-xl font-semibold">{totalEnrollees}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div>
                            <p className="text-sm text-gray-500">Total Employees</p>
                            <p className="text-xl font-semibold">{totalEmployeesEnrolled}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div>
                            <p className="text-sm text-gray-500">Total Dependents</p>
                            <p className="text-xl font-semibold">{totalDependentsEnrolled}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="amount"
                            name="Monthly Spend"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="monthly-breakdown">
              <div>
                <Card className="relative">
                  <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle>Monthly Spend</CardTitle>
                    <div className="flex space-x-2">
                      <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          {monthlyData.map((data) => (
                            <SelectItem key={data.month} value={data.month}>
                              {data.month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {currentMonthData && (
                      <>
                        <div className="text-2xl font-bold mb-4">
                          Total Spend: ${currentMonthData.amount.toLocaleString()}
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Category</TableHead>
                              <TableHead>Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Membership Fees</TableCell>
                              <TableCell>
                                ${currentMonthData.amount.toLocaleString()}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground">
                            Employees: {currentMonthData.employees} | Dependents:{" "}
                            {currentMonthData.dependents}
                          </p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="transactions">
              <Card className="relative">
                <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader className="bg-gray-100/50">
                        <TableRow>
                          <TableHead className="font-medium">Transaction #</TableHead>
                          <TableHead className="font-medium">Transaction Date</TableHead>
                          <TableHead className="font-medium">Enrollee Name</TableHead>
                          <TableHead className="font-medium">Employer Name</TableHead>
                          <TableHead className="font-medium">Broker</TableHead>
                          <TableHead className="font-medium">Amount</TableHead>
                          <TableHead className="font-medium">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction) => (
                          <TableRow key={transaction.id} className="hover:bg-gray-100/50">
                            <TableCell className="font-mono">{transaction.id}</TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>{transaction.enrolleeName}</TableCell>
                            <TableCell>{transaction.employerName}</TableCell>
                            <TableCell>{transaction.broker}</TableCell>
                            <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant={transaction.status === 'Completed' ? 'success' : 'warning'}>
                                {transaction.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

