"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X, Users, DollarSign, Clock } from 'lucide-react'

interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  status: "enrolled" | "pending"
}

interface Employer {
  id: string
  name: string
  enrolledCount: number
  pendingCount: number
  revenue: number
  employees: Employee[]
}

export function EmployerEnrollments({ onClose }: { onClose: () => void }) {
  const [employers, setEmployers] = useState<Employer[]>([
    {
      id: "1",
      name: "TechCorp Inc.",
      enrolledCount: 50,
      pendingCount: 10,
      revenue: 15000,
      employees: [
        { id: "1", firstName: "John", lastName: "Doe", email: "john@techcorp.com", status: "enrolled" },
        { id: "2", firstName: "Jane", lastName: "Smith", email: "jane@techcorp.com", status: "pending" },
      ]
    },
    {
      id: "2",
      name: "HealthCare Solutions",
      enrolledCount: 75,
      pendingCount: 15,
      revenue: 22500,
      employees: [
        { id: "3", firstName: "Alice", lastName: "Johnson", email: "alice@healthcare.com", status: "enrolled" },
        { id: "4", firstName: "Bob", lastName: "Brown", email: "bob@healthcare.com", status: "pending" },
      ]
    },
  ])

  const totalEnrollments = employers.reduce((sum, employer) => sum + employer.enrolledCount, 0)
  const totalPending = employers.reduce((sum, employer) => sum + employer.pendingCount, 0)
  const totalRevenue = employers.reduce((sum, employer) => sum + employer.revenue, 0)

  return (
    <Card className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Employer Enrollments</CardTitle>
        <Button variant="ghost" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEnrollments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Enrollments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
        <ScrollArea className="h-[calc(100vh-350px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employer</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employers.flatMap((employer) => 
                employer.employees
                  .filter((employee) => employee.status === "pending")
                  .map((employee) => (
                    <TableRow key={`${employer.id}-${employee.id}`}>
                      <TableCell className="font-medium">{employer.name}</TableCell>
                      <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.status}</TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

