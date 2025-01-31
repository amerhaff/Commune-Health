import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, UserMinus } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

interface Dependent {
  id: string
  firstName: string
  lastName: string
  relationship: string
  membershipTier: string
  age: number
  sex: "Male" | "Female" | "Other"
  monthlyFee: number
}

interface Employee {
  id: string
  firstName: string
  lastName: string
  membershipTier: string
  dependents: Dependent[]
  startDate: string
  age: number
  sex: "Male" | "Female" | "Other"
  monthlyFee: number
}

interface Enrollment {
  id: string
  provider: string
  broker?: string
  employees: Employee[]
}

const enrollments: Enrollment[] = [
  {
    id: "1",
    provider: "HealthFirst Clinic",
    broker: "John Doe Insurance",
    employees: [
      {
        id: "e1",
        firstName: "Alice",
        lastName: "Johnson",
        membershipTier: "Premium",
        startDate: "2023-06-01",
        age: 35,
        sex: "Female",
        monthlyFee: 200,
        dependents: [
          { id: "d1", firstName: "Bob", lastName: "Johnson", relationship: "Spouse", membershipTier: "Premium", age: 37, sex: "Male", monthlyFee: 180 },
          { id: "d2", firstName: "Charlie", lastName: "Johnson", relationship: "Child", membershipTier: "Basic", age: 10, sex: "Male", monthlyFee: 50 },
        ]
      },
      {
        id: "e2",
        firstName: "David",
        lastName: "Smith",
        membershipTier: "Standard",
        startDate: "2023-06-15",
        age: 42,
        sex: "Male",
        monthlyFee: 150,
        dependents: []
      }
    ]
  },
  {
    id: "2",
    provider: "City Health Center",
    employees: [
      {
        id: "e3",
        firstName: "Emma",
        lastName: "Davis",
        membershipTier: "Premium",
        startDate: "2023-07-15",
        age: 29,
        sex: "Female",
        monthlyFee: 200,
        dependents: [
          { id: "d3", firstName: "Frank", lastName: "Davis", relationship: "Child", membershipTier: "Basic", age: 5, sex: "Male", monthlyFee: 60 },
        ]
      }
    ]
  }
]

export function EnrollmentsView() {
  const [expandedEmployees, setExpandedEmployees] = useState<string[]>([])
  const [enrollmentData, setEnrollmentData] = useState<Enrollment[]>(enrollments)

  const toggleEmployeeExpansion = (employeeId: string) => {
    setExpandedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    )
  }

  const handleDisenroll = (enrollmentId: string, employeeId: string, dependentId?: string) => {
    setEnrollmentData(prevEnrollments =>
      prevEnrollments.map(enrollment =>
        enrollment.id === enrollmentId
          ? {
              ...enrollment,
              employees: enrollment.employees.map(emp =>
                emp.id === employeeId
                  ? dependentId
                    ? { ...emp, dependents: emp.dependents.filter(dep => dep.id !== dependentId) }
                    : null // Remove the entire employee if no dependentId is provided
                  : emp
              ).filter(Boolean) as Employee[] // Remove null values (disenrolled employees)
            }
          : enrollment
      ).filter(enrollment => enrollment.employees.length > 0) // Remove enrollments with no employees
    )

    toast({
      title: "Disenrollment Successful",
      description: dependentId 
        ? "The dependent has been disenrolled and removed from the list." 
        : "The employee and all dependents have been disenrolled and removed from the list.",
      duration: 3000,
    })

    // Close the expanded view for the disenrolled employee
    if (!dependentId) {
      setExpandedEmployees(prev => prev.filter(id => id !== employeeId))
    }
  }

  const enrollmentSummary = useMemo(() => {
    return enrollmentData.map(enrollment => {
      const employeeCount = enrollment.employees.length
      const dependentCount = enrollment.employees.reduce((acc, employee) => acc + employee.dependents.length, 0)
      const totalEnrolled = employeeCount + dependentCount
      return {
        id: enrollment.id,
        provider: enrollment.provider,
        employeeCount,
        dependentCount,
        totalEnrolled
      }
    })
  }, [enrollmentData])

  const totalSummary = useMemo(() => {
    return enrollmentSummary.reduce((acc, summary) => {
      acc.totalEmployees += summary.employeeCount
      acc.totalDependents += summary.dependentCount
      acc.totalEnrolled += summary.totalEnrolled
      return acc
    }, { totalEmployees: 0, totalDependents: 0, totalEnrolled: 0 })
  }, [enrollmentSummary])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Current Enrollments</h2>
        <div className="text-right">
          <p><strong>Total Enrolled:</strong> {totalSummary.totalEnrolled} ({totalSummary.totalEmployees} employees, {totalSummary.totalDependents} dependents)</p>
        </div>
      </div>

      {enrollmentData.map((enrollment) => (
        <Card key={enrollment.id} className="relative">
          <CardHeader>
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div>
            <div className="flex justify-between items-center">
              <CardTitle>Enrollment with {enrollment.provider}</CardTitle>
              <div className="text-sm">
                <strong>Total Enrolled:</strong> {enrollmentSummary.find(s => s.id === enrollment.id)?.totalEnrolled} 
                ({enrollmentSummary.find(s => s.id === enrollment.id)?.employeeCount} employees, 
                {enrollmentSummary.find(s => s.id === enrollment.id)?.dependentCount} dependents)
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {enrollment.broker && (
              <div className="mb-4">
                <p><strong>Broker:</strong> {enrollment.broker}</p>
              </div>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Sex</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Membership Tier</TableHead>
                  <TableHead>Monthly Fee</TableHead>
                  <TableHead>Actions</TableHead>
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
                            onClick={() => toggleEmployeeExpansion(employee.id)}
                          >
                            {expandedEmployees.includes(employee.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                      <TableCell>{employee.age}</TableCell>
                      <TableCell>{employee.sex}</TableCell>
                      <TableCell>{employee.startDate}</TableCell>
                      <TableCell>
                        <Badge>{employee.membershipTier}</Badge>
                      </TableCell>
                      <TableCell>${employee.monthlyFee}</TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <UserMinus className="mr-2 h-4 w-4" />
                              Disenroll
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action will disenroll {employee.firstName} {employee.lastName} and all their dependents from their current plan. This cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDisenroll(enrollment.id, employee.id)}>
                                Confirm Disenrollment
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                    {expandedEmployees.includes(employee.id) && employee.dependents.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Dependent</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Sex</TableHead>
                                <TableHead>Relationship</TableHead>
                                <TableHead>Membership Tier</TableHead>
                                <TableHead>Monthly Fee</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {employee.dependents.map((dependent) => (
                                <TableRow key={dependent.id}>
                                  <TableCell>{dependent.firstName} {dependent.lastName}</TableCell>
                                  <TableCell>{dependent.age}</TableCell>
                                  <TableCell>{dependent.sex}</TableCell>
                                  <TableCell>{dependent.relationship}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline">{dependent.membershipTier}</Badge>
                                  </TableCell>
                                  <TableCell>${dependent.monthlyFee}</TableCell>
                                  <TableCell>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm">
                                          <UserMinus className="mr-2 h-4 w-4" />
                                          Disenroll
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action will disenroll {dependent.firstName} {dependent.lastName} from their current plan. This cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleDisenroll(enrollment.id, employee.id, dependent.id)}>
                                            Confirm Disenrollment
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
        </Card>
      ))}
    </div>
  )
}

