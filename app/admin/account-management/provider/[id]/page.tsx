"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import {
Card,
CardContent,
CardHeader,
CardTitle,
CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { Plus, UserMinus, Users, ChevronRight, ArrowLeft, Building2, DollarSign, Phone, Mail, MapPin, Briefcase, ChevronUp, ChevronDown, ArrowUpRight, Calendar, TrendingUp } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
DialogTrigger,
DialogFooter,
} from "@/components/ui/dialog"
import React from "react"
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
status: "Not Enrolled" | "Enrolled" | "Pending"
dpcProvider: string
membershipTier: string
dependents: Dependent[]
membershipAmount?: number
enrollmentDate?: string
isExpanded: boolean;
}

// Define Employer interface
interface Employer {
id: string
name: string
address: string
phone: string
contactPerson: {
name: string
email: string
}
broker: string // Added broker field
employees: Employee[]
isExpanded: boolean;
}

// Define Transaction interface
interface Transaction {
id: number;
date: string;
enrolleeName: string; // Updated field name
employerName: string; // Updated field name
broker: string; // Updated field name
amount: number;
status: string;
}


export default function EmployeeRosterPage({
params,
}: {
params: { id: string }
}) {
const { toast } = useToast()
// Mock employer data - replace with actual data from backend
const [employers, setEmployers] = useState<Employer[]>([
{
id: "e1",
name: "TechCorp Inc.",
address: "123 Tech St, San Francisco, CA 94105",
phone: "555-1212",
contactPerson: {
  name: "John Smith",
  email: "john.smith@techcorp.com",
},
broker: "John Doe Insurance", // Added broker
employees: [
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
        membershipAmount: 50,
        dpcProvider: "HealthFirst Clinic",
        membershipTier: "Standard",
        enrollmentDate: "2023-10-26",
      },
    ],
    membershipAmount: 200,
    enrollmentDate: "2023-10-26",
    isExpanded: false,
  },
  // ... more employees for TechCorp Inc.
],
isExpanded: false,
},
{
id: "e2",
name: "HealthCare Solutions",
address: "456 Health Ave, Chicago, IL 60601",
phone: "555-0202",
contactPerson: {
  name: "Sarah Johnson",
  email: "sarah@healthcaresolutions.com",
},
broker: "Jane Smith Benefits", // Added broker
employees: [
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
    dependents: [],
    isExpanded: false,
  },
  // ... more employees for HealthCare Solutions
],
isExpanded: false,
},
])


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
dependents: [
  { id: "1-1", firstName: "Jane", lastName: "Doe", relationship: "Spouse", dateOfBirth: "1987-03-20", sex: "Female", isEnrolled: true, membershipAmount: 100, dpcProvider: "HealthFirst Clinic", membershipTier: "Standard", enrollmentDate: "2023-10-26" },
  { id: "1-2", firstName: "Jimmy", lastName: "Doe", relationship: "Child", dateOfBirth: "2010-11-05", sex: "Male", isEnrolled: true, membershipAmount: 50, dpcProvider: "HealthFirst Clinic", membershipTier: "Standard", enrollmentDate: "2023-10-26" },
],
membershipAmount: 200,
enrollmentDate: "2023-10-26",
isExpanded: false,
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
dependents: [],
isExpanded: false,
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
dependents: [],
membershipAmount: 150,
enrollmentDate: "2024-01-15",
isExpanded: false,
},
])

const [enrollmentFigures, setEnrollmentFigures] = useState({
totalEmployees: 0,
enrolledEmployees: 0,
unenrolledEmployees: 0,
enrolledDependents: 0,
totalEnrollees: 0,
employerClients: 0, // Added employerClients
})

const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id' | 'dependents'>>({
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
isExpanded: false,
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
const [activeSubTab, setActiveSubTab] = useState<"enrollee-list" | "revenues" | "transactions">("enrollee-list")
const [revenueData, setRevenueData] = useState({ annualRevenue: 241800, ytdRevenue: 201500, monthlyRevenue: 22650, totalEnrollees: 221, revenueGrowth: 15.5, enrolleeGrowth: 8.2 })
const [expandedEmployeeIds, setExpandedEmployeeIds] = useState<string[]>([]);

const toggleEmployeeExpansion = (employeeId: string) => {
setExpandedEmployeeIds(prevIds =>
prevIds.includes(employeeId)
  ? prevIds.filter(id => id !== employeeId)
  : [...prevIds, employeeId]
);
};

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
figures.employerClients = figures.totalEmployees; // Added employerClients calculation
setEnrollmentFigures(figures);
}, [employees]);


const handleAddEmployee = () => {
const newEmployeeId = (employees.length + 1).toString()
const employeeToAdd: Employee = {
...newEmployee,
id: newEmployeeId,
dependents: [],
enrollmentDate: "",
isExpanded: false,
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
isExpanded: false,
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

const [transactions, setTransactions] = useState<Transaction[]>([
{ id: 1, date: "2024-05-03", enrolleeName: "John Doe", employerName: "TechCorp Inc.", broker: "John Doe", amount: 1500, status: "Completed" },
{ id: 2, date: "2024-05-04", enrolleeName: "Jane Doe", employerName: "TechCorp Inc.", broker: "Jane Doe", amount: 2000, status: "Completed" },
{ id: 3, date: "2024-05-05", enrolleeName: "Peter Jones", employerName: "HealthCare Solutions", broker: "Peter Jones", amount: 1200, status: "Pending" },
{ id: 4, date: "2024-05-06", enrolleeName: "Alice Johnson", employerName: "EduLearn Systems", broker: "Alice Johnson", amount: 1800, status: "Completed" },
{ id: 5, date: "2024-05-07", enrolleeName: "David Lee", employerName: "TechCorp Inc.", broker: "David Lee", amount: 150, status: "Pending" },
{ id: 6, date: "2024-05-08", enrolleeName: "Emily Brown", employerName: "HealthCare Solutions", broker: "Emily Brown", amount: 2500, status: "Completed" },
{ id: 7, date: "2024-05-09", enrolleeName: "Michael Davis", employerName: "EduLearn Systems", broker: "Michael Davis", amount: 500, status: "Completed" },
{ id: 8, date: "2024-05-10", enrolleeName: "Sarah Wilson", employerName: "TechCorp Inc.", broker: "Sarah Wilson", amount: 1500, status: "Completed" },
{ id: 9, date: "2024-05-11", enrolleeName: "Kevin Garcia", employerName: "HealthCare Solutions", broker: "Kevin Garcia", amount: 800, status: "Pending" },
{ id: 10, date: "2024-05-12", enrolleeName: "Angela Rodriguez", employerName: "EduLearn Systems", broker: "Angela Rodriguez", amount: 2100, status: "Completed" },
])

const toggleEmployerExpansion = (employerId: string) => {
setEmployers(prevEmployers =>
prevEmployers.map(employer =>
  employer.id === employerId ? { ...employer, isExpanded: !employer.isExpanded } : employer
)
);
};

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
  <h1 className="text-3xl font-bold">Practice Name</h1>
  <Button asChild variant="outline">
    <Link href="/admin/account-management">
      <ArrowLeft className="mr-2 h-4 w-4" /> Back
    </Link>
  </Button>
</div>
<Card className="mb-8 relative">
  <CardHeader>
    <CardTitle>Overview</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
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

{/* Total Enrollees Section */}
<div className="grid grid-cols-2 gap-4">
<div>
<p className="text-sm text-muted-foreground">Total Enrollees</p>
<div className="flex items-center gap-2"> {/* Updated class name */}
  <p className="text-2xl font-bold">{enrollmentFigures.totalEnrollees}</p>
  <Users className="h-4 w-4 text-blue-600" /> {/* Blue icon */}
</div>
<div className="mt-2 space-y-1">
  <p className="text-sm text-muted-foreground">
</div>
</div>
<div>
<p className="text-sm text-muted-foreground">Employer Clients</p>
<p className="text-2xl font-bold">{enrollmentFigures.employerClients}</p> {/* Added Employer Clients */}
</div>
</div>
</div>
  </CardContent>
</Card>

<Card className="relative">
  <CardHeader>
    <CardTitle>More Practice Information</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
    <Tabs defaultValue="enrollee-list" className="w-full mb-4" onValueChange={setActiveSubTab}>
      <TabsList>
        <TabsTrigger value="enrollee-list" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>Enrollee List</TabsTrigger>
        <TabsTrigger value="revenues" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>Revenues</TabsTrigger>
        <TabsTrigger value="transactions" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>Transactions</TabsTrigger> {/* New Transactions tab */}
      </TabsList>
      <TabsContent value="enrollee-list">
        {/* Employer Cards */}
        <div className="space-y-4">
          {employers.map((employer) => (
            <Card key={employer.id} className="p-4 relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
              <div>
                <h3 className="font-medium text-lg">{employer.name}</h3>
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4" />
                  <p>{employer.address}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <Phone className="h-4 w-4" />
                  <p>{employer.phone}</p>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {employer.contactPerson.name}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {employer.contactPerson.email}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Broker: {employer.broker} {/* Display broker name */}
                </p>
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleEmployerExpansion(employer.id)}
                  className="w-full justify-between"
                >
                  {employer.isExpanded ? "Hide Enrollee List" : "Show Enrollee List"}
                  {employer.isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
                {employer.isExpanded && (
                  <div className={`mt-4 border rounded-md overflow-hidden fade-in-out ${employer.isExpanded ? 'fade-in-out-enter-active' : 'fade-in-out-exit-active'}`}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]"></TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Date of Birth</TableHead>
                          <TableHead>Sex</TableHead>
                          <TableHead>Membership Amount</TableHead>
                          <TableHead>Membership Tier</TableHead>
                          <TableHead>Enrollment Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employer.employees.map((employee) => (
                          <React.Fragment key={employee.id}>
                            <TableRow>
                              <TableCell>
                                {employee.dependents.length > 0 && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-0"
                                    onClick={() => toggleEmployeeExpansion(employee.id)}
                                  >
                                    {expandedEmployeeIds.includes(employee.id) ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </Button>
                                )}
                              </TableCell>
                              <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                              <TableCell>{employee.email}</TableCell>
                              <TableCell>{employee.dateOfBirth}</TableCell>
                              <TableCell>{employee.sex}</TableCell>
                              <TableCell>{employee.membershipAmount ? `$${employee.membershipAmount}` : "N/A"}</TableCell>
                              <TableCell>{employee.membershipTier || "Not Assigned"}</TableCell>
                              <TableCell>{employee.enrollmentDate || "N/A"}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="destructive" size="sm" onClick={() => handleRemoveEmployee(employee.id)}>
                                    <UserMinus className="mr-2 h-4 w-4" />
                                    Remove
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                            {/* Conditionally render dependent rows */}
                            {expandedEmployeeIds.includes(employee.id) &&
                              employee.dependents.map((dependent) => (
                                <TableRow key={dependent.id} className="bg-gray-100">
                                  <TableCell></TableCell>
                                  <TableCell className="pl-8">{dependent.firstName} {dependent.lastName} (Dependent)</TableCell>
                                  <TableCell>{dependent.relationship}</TableCell>
                                  <TableCell>{dependent.dateOfBirth}</TableCell>
                                  <TableCell>{dependent.sex}</TableCell>
                                  <TableCell>{dependent.membershipAmount ? `$${dependent.membershipAmount}` : "N/A"}</TableCell>
                                  <TableCell>{dependent.membershipTier}</TableCell>
                                  <TableCell>{dependent.enrollmentDate || 'N/A'}</TableCell>
                                  <TableCell>
                                    <Button variant="destructive" size="sm" onClick={() => handleRemoveDependent(employee.id, dependent.id)}>
                                      <UserMinus className="mr-2 h-4 w-4" />
                                      Remove
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="revenues">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium z-10">Annual Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600 z-10" /> {/* Blue icon */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${revenueData.annualRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-blue-600" /> {/* Blue icon */}
                  {revenueData.revenueGrowth}% from last year
                </span>
              </p>
            </CardContent>
          </Card>
          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium z-10">Year-to-Date Revenue</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600 z-10" /> {/* Blue icon */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${revenueData.ytdRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">As of December 2023</p>
            </CardContent>
          </Card>
          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium z-10">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600 z-10" /> {/* Blue icon */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${revenueData.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">For December 2023</p>
            </CardContent>
          </Card>
          <Card className="relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium z-10pb-2">
              Total Enrollees</CardTitle>
              <Users className="h-4 w-4 text-blue-600 z-10" /> {/* Blue icon */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrollmentFigures.totalEnrollees}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-blue-600" /> {/* Blue icon */}
                  {revenueData.enrolleeGrowth}% from last year
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="transactions"> {/* New Tab Content for Transactions */}
        <Card className="relative"> {/* Added relative class to card */}
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div> {/* Blue strip */}
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction #</TableHead>
                  <TableHead>Transaction Date</TableHead>
                  <TableHead>Enrollee Name</TableHead>                  <TableHead>Employer Name</TableHead>
                  <TableHead>Broker</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="border-b border-gray-200 px-4 py-2">{transaction.id}</TableCell>
                    <TableCell className="border-b border-gray-200 px-4 py-2">{transaction.date}</TableCell>
                    <TableCell className="border-b border-gray-200 px-4 py-2">{transaction.enrolleeName}</TableCell>
                    <TableCell className="border-b border-gray-200 px-4 py-2">{transaction.employerName}</TableCell>
                    <TableCell className="border-b border-gray-200 px-4 py-2">{transaction.broker}</TableCell>
                    <TableCell className="border-b border-gray-200 px-4 py-2">${transaction.amount}</TableCell>
                    <TableCell className="border-b border-gray-200 px-4 py-2">
                      <Badge variant={transaction.status === "Pending" ? "outline" : "default"}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </CardContent>
</Card>
</div>
)
}

