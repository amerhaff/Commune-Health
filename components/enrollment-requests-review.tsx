"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { ChevronDown, ChevronUp, Trash2, Save } from 'lucide-react'

interface Dependent {
  id: string
  firstName: string
  lastName: string
  relationship: string
  dateOfBirth: string
  sex: "Male" | "Female" | "Other"
  selected: boolean
  membershipTier: string
  membershipAmount: number
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
  isExpanded: boolean
  membershipTier: string
  membershipAmount: number
  dependents: Dependent[]
}

interface EnrollmentRequest {
  id: string
  dpcPracticeName: string
  brokerName: string
  brokerCompany: string
  brokerProvider: string
  status: "Pending" | "Approved" | "Rejected"
  employees: Employee[]
}

interface EnrollmentRequestsReviewProps {
  requestCount: number;
  setRequestCount: React.Dispatch<React.SetStateAction<number>>;
}

export function EnrollmentRequestsReview({ requestCount, setRequestCount }: EnrollmentRequestsReviewProps) {
  const [requests, setRequests] = useState<EnrollmentRequest[]>([
    {
      id: "1",
      dpcPracticeName: "HealthFirst Clinic",
      brokerName: "John Doe",
      brokerCompany: "ABC Insurance",
      brokerProvider: "Dr. Jane Smith",
      status: "Pending",
      employees: [
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
          selected: true,
          isExpanded: false,
          membershipTier: "Standard",
          membershipAmount: 150,
          dependents: [
            { id: "1-1", firstName: "Bob", lastName: "Johnson", relationship: "Spouse", dateOfBirth: "1983-07-22", sex: "Male", selected: true, membershipTier: "Basic", membershipAmount: 75 },
            { id: "1-2", firstName: "Charlie", lastName: "Johnson", relationship: "Child", dateOfBirth: "2010-11-05", sex: "Male", selected: true, membershipTier: "Child", membershipAmount: 50 },
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
          selected: true,
          isExpanded: false,
          membershipTier: "Premium",
          membershipAmount: 250,
          dependents: [
            { id: "2-1", firstName: "Eva", lastName: "Smith", relationship: "Child", dateOfBirth: "2015-04-12", sex: "Female", selected: true, membershipTier: "Standard", membershipAmount: 100 },
          ]
        },
      ]
    }
  ])

  const handleCancelRequest = (requestId: string) => {
    setRequests(prevRequests => prevRequests.map(request => 
      request.id === requestId ? { ...request, employees: [] } : request
    ));
    toast({
      title: "Enrollment Request Cancelled",
      description: "All employees have been removed from the enrollment request.",
    })
  }

  const handleUpdateRequest = (requestId: string) => {
    handleCancelRequest(requestId);
  }

  const addEmployee = (requestId: string) => {
    setRequests(requests.map(request =>
      request.id === requestId
        ? {
            ...request,
            employees: [...request.employees, {
              id: `new-${Date.now()}`,
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
              selected: true,
              isExpanded: false,
              membershipTier: "",
              membershipAmount: 0,
              dependents: []
            }]
          }
        : request
    ))
  }

  const removeEmployee = (requestId: string, employeeId: string) => {
    setRequests(requests.map(request =>
      request.id === requestId
        ? {
            ...request,
            employees: request.employees.filter(emp => emp.id !== employeeId)
          }
        : request
    ).filter(request => request.employees.length > 0))
    
    // Update request count if a request was removed due to having no employees
    setRequestCount(prevCount => {
      const newCount = requests.filter(request => 
        request.id === requestId ? request.employees.length > 1 : true
      ).length
      return newCount
    })
  }

  const updateEmployee = (requestId: string, employeeId: string, field: string, value: any) => {
    setRequests(requests.map(request =>
      request.id === requestId
        ? {
            ...request,
            employees: request.employees.map(emp =>
              emp.id === employeeId
                ? { ...emp, [field]: value }
                : emp
            )
          }
        : request
    ))
  }

  const toggleEmployeeExpansion = (requestId: string, employeeId: string) => {
    setRequests(requests.map(request =>
      request.id === requestId
        ? {
            ...request,
            employees: request.employees.map(emp =>
              emp.id === employeeId ? { ...emp, isExpanded: !emp.isExpanded } : emp
            )
          }
        : request
    ))
  }

  const saveRequest = (requestId: string) => {
    // Here you would typically send the updated request to your backend
    console.log("Saving request:", requests.find(req => req.id === requestId))
    toast({
      title: "Request Saved",
      description: "The enrollment request has been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Enrollment Requests</h2>
      {requests.map(request => (
        <Card key={request.id} className="relative">
          <CardHeader>
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <div className="relative z-10"> {/* Wrap CardTitle in a relative div */}
              <CardTitle>{request.dpcPracticeName}</CardTitle>
            </div>
            <div className="space-y-1">
              <CardDescription>DPC Provider: {request.brokerProvider}</CardDescription>
              <CardDescription>Brokerage: {request.brokerCompany}</CardDescription>
              <CardDescription>Broker: {request.brokerName}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Sex</TableHead>
                  <TableHead>Membership Tier</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {request.employees.map((employee) => (
                  <React.Fragment key={employee.id}>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mr-2 p-0"
                            onClick={() => toggleEmployeeExpansion(request.id, employee.id)}
                          >
                            {employee.isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronUp className="h-4 w-4" />
                            )}
                          </Button>
                          <Input
                            value={`${employee.firstName} ${employee.lastName}`}
                            onChange={(e) => {
                              const [firstName, ...lastNameParts] = e.target.value.split(' ');
                              updateEmployee(request.id, employee.id, 'firstName', firstName);
                              updateEmployee(request.id, employee.id, 'lastName', lastNameParts.join(' '));
                            }}
                            className="border-none"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={employee.email}
                          onChange={(e) => updateEmployee(request.id, employee.id, 'email', e.target.value)}
                          className="border-none"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="date"
                          value={employee.dateOfBirth}
                          onChange={(e) => updateEmployee(request.id, employee.id, 'dateOfBirth', e.target.value)}
                          className="border-none"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={employee.sex}
                          onValueChange={(value) => updateEmployee(request.id, employee.id, 'sex', value)}
                        >
                          <SelectTrigger className="border-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                      <Select value={employee.membershipTier} onValueChange={(value) => updateEmployee(request.id, employee.id, 'membershipTier', value)}>
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
                        <Input type="number" value={employee.membershipAmount} onChange={(e) => updateEmployee(request.id, employee.id, 'membershipAmount', parseInt(e.target.value, 10) || 0)} className="border-none" />
                      </TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm" onClick={() => removeEmployee(request.id, employee.id)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                    {employee.isExpanded && (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <div className="pl-8">
                            <h4 className="font-semibold mb-2">Dependents</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Date of Birth</TableHead>
                                  <TableHead>Sex</TableHead>
                                  <TableHead>Relationship</TableHead>
                                  <TableHead>Membership Tier</TableHead>
                                  <TableHead>Amount</TableHead>
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {employee.dependents.map((dependent, index) => (
                                  <TableRow key={dependent.id}>
                                    <TableCell>
                                      <Input
                                        value={`${dependent.firstName} ${dependent.lastName}`}
                                        onChange={(e) => {
                                          const [firstName, ...lastNameParts] = e.target.value.split(' ');
                                          const updatedDependents = [...employee.dependents];
                                          updatedDependents[index] = {
                                            ...updatedDependents[index],
                                            firstName,
                                            lastName: lastNameParts.join(' ')
                                          };
                                          updateEmployee(request.id, employee.id, 'dependents', updatedDependents);
                                        }}
                                        className="border-none"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="date"
                                        value={dependent.dateOfBirth}
                                        onChange={(e) => {
                                          const updatedDependents = [...employee.dependents];
                                          updatedDependents[index] = { ...updatedDependents[index], dateOfBirth: e.target.value };
                                          updateEmployee(request.id, employee.id, 'dependents', updatedDependents);
                                        }}
                                        className="border-none"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Select
                                        value={dependent.sex}
                                        onValueChange={(value) => {
                                          const updatedDependents = [...employee.dependents];
                                          updatedDependents[index] = { ...updatedDependents[index], sex: value as "Male" | "Female" | "Other" };
                                          updateEmployee(request.id, employee.id, 'dependents', updatedDependents);
                                        }}
                                      >
                                        <SelectTrigger className="border-none">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Male">Male</SelectItem>
                                          <SelectItem value="Female">Female</SelectItem>
                                          <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </TableCell>
                                    <TableCell>{dependent.relationship}</TableCell>
                                    <TableCell>
                                      <Select value={dependent.membershipTier} onValueChange={(value) => { const updatedDependents = [...employee.dependents]; updatedDependents[index] = { ...updatedDependents[index], membershipTier: value }; updateEmployee(request.id, employee.id, 'dependents', updatedDependents); }}>
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
                                      <Input type="number" value={dependent.membershipAmount} onChange={(e) => { const updatedDependents = [...employee.dependents]; updatedDependents[index] = { ...updatedDependents[index], membershipAmount: parseInt(e.target.value, 10) || 0 }; updateEmployee(request.id, employee.id, 'dependents', updatedDependents); }} className="border-none" />
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                          const updatedDependents = employee.dependents.filter(dep => dep.id !== dependent.id);
                                          updateEmployee(request.id, employee.id, 'dependents', updatedDependents);
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newDependent: Dependent = {
                                  id: `dep-${Date.now()}`,
                                  firstName: "",
                                  lastName: "",
                                  dateOfBirth: "",
                                  sex: "Other",
                                  relationship: "Child",
                                  membershipTier: "",
                                  membershipAmount: 0,
                                  selected: true
                                };
                                updateEmployee(request.id, employee.id, 'dependents', [...employee.dependents, newDependent]);
                              }}
                            >
                              Add Dependent
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <Button onClick={() => addEmployee(request.id)}>
                  Add Employee
                </Button>
                <Button onClick={() => saveRequest(request.id)} variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Request
                </Button>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Cancel Request
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Enrollment Request</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel this enrollment request? This action will remove all employees from the request and cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleCancelRequest(request.id)}>Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
      {requests.every(request => request.employees.length === 0) && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-lg text-gray-500">No enrollment requests available.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

