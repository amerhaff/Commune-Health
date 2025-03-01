"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { Plus, UserMinus, ChevronRight, ChevronDown, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import React from "react"

interface Dependent {
  id: string
  firstName: string
  lastName: string
  relationship: string
  dateOfBirth: string
  sex: "Male" | "Female" | "Other"
  isEnrolled: boolean
  membershipAmount?: number
  dpcProvider: string
  membershipTier: string
}

interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  sex: "Male" | "Female" | "Other"
  employeeType: "Full-time" | "Part-time" | "Temporary" | "Contractor"
  address: string
  apartment: string
  city: string
  state: string
  zipCode: string
  status: "Not Enrolled" | "Enrolled" | "Pending"
  dpcProvider: string
  membershipTier: string
  isExpanded: boolean
  dependents: Dependent[]
  membershipAmount?: number
}

export default function EmployeeRosterPage() {
  const { toast } = useToast()
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      dateOfBirth: "1985-05-15",
      sex: "Male",
      employeeType: "Full-time",
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
        {
          id: "1-1",
          firstName: "Jane",
          lastName: "Doe",
          relationship: "Spouse",
          dateOfBirth: "1987-03-20",
          sex: "Female",
          isEnrolled: true,
          membershipAmount: 100,
          dpcProvider: "HealthFirst Clinic",
          membershipTier: "Standard",
        },
        {
          id: "1-2",
          firstName: "Jimmy",
          lastName: "Doe",
          relationship: "Child",
          dateOfBirth: "2010-11-05",
          sex: "Male",
          isEnrolled: true,
          membershipAmount: 50,
          dpcProvider: "HealthFirst Clinic",
          membershipTier: "Standard",
        },
      ],
      membershipAmount: 200,
    },
    {
      id: "2",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      dateOfBirth: "1990-08-22",
      sex: "Female",
      employeeType: "Full-time",
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
      employeeType: "Full-time",
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
    },
  ])

  const [enrollmentFigures, setEnrollmentFigures] = useState({
    totalEmployees: 0,
    enrolledEmployees: 0,
    unenrolledEmployees: 0,
    enrolledDependents: 0,
    totalEnrollees: 0,
  })

  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id" | "isExpanded" | "dependents">>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    sex: "Other",
    employeeType: "Full-time",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    status: "Not Enrolled",
    dpcProvider: "",
    membershipTier: "",
  })

  const [newDependent, setNewDependent] = useState<Omit<Dependent, "id">>({
    firstName: "",
    lastName: "",
    relationship: "",
    dateOfBirth: "",
    sex: "Other",
    isEnrolled: false,
    dpcProvider: "",
    membershipTier: "",
  })

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)

  useEffect(() => {
    const figures = employees.reduce(
      (acc, employee) => {
        acc.totalEmployees++
        if (employee.status === "Enrolled") {
          acc.enrolledEmployees++
          acc.enrolledDependents += employee.dependents.filter((d) => d.isEnrolled).length
        } else {
          acc.unenrolledEmployees++
        }
        return acc
      },
      { totalEmployees: 0, enrolledEmployees: 0, unenrolledEmployees: 0, enrolledDependents: 0 },
    )

    figures.totalEnrollees = figures.enrolledEmployees + figures.enrolledDependents
    setEnrollmentFigures(figures)
  }, [employees])

  const toggleEmployeeExpansion = (employeeId: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) => (emp.id === employeeId ? { ...emp, isExpanded: !emp.isExpanded } : emp)),
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

  const handleAddEmployee = () => {
    const newEmployeeId = (employees.length + 1).toString()
    const employeeToAdd: Employee = {
      ...newEmployee,
      id: newEmployeeId,
      isExpanded: false,
      dependents: [],
    }
    setEmployees([...employees, employeeToAdd])
    setNewEmployee({
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      sex: "Other",
      employeeType: "Full-time",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      status: "Not Enrolled",
      dpcProvider: "",
      membershipTier: "",
    })
    toast({
      title: "Employee Added",
      description: `${newEmployee.firstName} ${newEmployee.lastName} has been added to the roster.`,
    })
  }

  const handleRemoveEmployee = (employeeId: string) => {
    setEmployees(employees.filter((emp) => emp.id !== employeeId))
    toast({
      title: "Employee Removed",
      description: "The employee has been removed from the roster.",
    })
  }

  const handleAddDependent = () => {
    if (selectedEmployeeId) {
      const newDependentId = Date.now().toString()
      const employee = employees.find((emp) => emp.id === selectedEmployeeId)
      setEmployees(
        employees.map((emp) =>
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
            : emp,
        ),
      )
      setNewDependent({
        firstName: "",
        lastName: "",
        relationship: "",
        dateOfBirth: "",
        sex: "Other",
        isEnrolled: false,
        dpcProvider: "",
        membershipTier: "",
      })
      toast({
        title: "Dependent Added",
        description: `${newDependent.firstName} ${newDependent.lastName} has been added as a dependent.`,
      })
    }
  }

  const handleRemoveDependent = (employeeId: string, dependentId: string) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === employeeId ? { ...emp, dependents: emp.dependents.filter((dep) => dep.id !== dependentId) } : emp,
      ),
    )
    toast({
      title: "Dependent Removed",
      description: "The dependent has been removed.",
    })
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

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee Roster</h1>
        <Button asChild variant="outline">
          <Link href="/employer/home">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
      <Card className="mb-6 relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" /> {/* Added blue strip */}
        <CardHeader>
          <CardTitle>Employee Overview</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card className="relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Sex</TableHead>
                  <TableHead>Employee Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>DPC Provider</TableHead>
                  <TableHead>Membership Tier</TableHead>
                  <TableHead>Membership Amount</TableHead>
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
                      <TableCell>
                        {employee.firstName} {employee.lastName}
                      </TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.dateOfBirth}</TableCell>
                      <TableCell>{employee.sex}</TableCell>
                      <TableCell>{employee.employeeType}</TableCell>
                      <TableCell>{getStatusBadge(employee.status)}</TableCell>
                      <TableCell>{employee.dpcProvider || "Not Assigned"}</TableCell>
                      <TableCell>{employee.membershipTier || "Not Assigned"}</TableCell>
                      <TableCell>
                        {employee.status === "Enrolled" ? `$${employee.membershipAmount || 0}` : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveEmployee(employee.id)}>
                          <UserMinus className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                    {employee.isExpanded && (
                      <TableRow>
                        <TableCell colSpan={10}>
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
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {employee.dependents.map((dependent) => (
                                  <TableRow key={dependent.id}>
                                    <TableCell>
                                      {dependent.firstName} {dependent.lastName}
                                    </TableCell>
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
                                    <TableCell>
                                      {dependent.isEnrolled ? `$${dependent.membershipAmount || 0}` : "N/A"}
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleRemoveDependent(employee.id, dependent.id)}
                                      >
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
                                        onChange={(e) =>
                                          setNewDependent({ ...newDependent, firstName: e.target.value })
                                        }
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
                                        onChange={(e) =>
                                          setNewDependent({ ...newDependent, relationship: e.target.value })
                                        }
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
                                        onChange={(e) =>
                                          setNewDependent({ ...newDependent, dateOfBirth: e.target.value })
                                        }
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="sex" className="text-right">
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
          <div className="mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="firstName" className="text-right">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={newEmployee.firstName}
                      onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lastName" className="text-right">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={newEmployee.lastName}
                      onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
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
                      value={newEmployee.dateOfBirth}
                      onChange={(e) => setNewEmployee({ ...newEmployee, dateOfBirth: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sex" className="text-right">
                      Sex
                    </Label>
                    <Select
                      value={newEmployee.sex}
                      onValueChange={(value) =>
                        setNewEmployee({ ...newEmployee, sex: value as "Male" | "Female" | "Other" })
                      }
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
                    <Label htmlFor="employeeType" className="text-right">
                      Employee Type
                    </Label>
                    <Select
                      value={newEmployee.employeeType}
                      onValueChange={(value) =>
                        setNewEmployee({
                          ...newEmployee,
                          employeeType: value as "Full-time" | "Part-time" | "Temporary" | "Contractor",
                        })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select employee type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Temporary">Temporary</SelectItem>
                        <SelectItem value="Contractor">Contractor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddEmployee}>Add Employee</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

