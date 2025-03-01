"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Employee {
  id: string
  firstName: string
  lastName: string
  age: number
  sex: string
  dependents: Array<{
    id: string
    firstName: string
    lastName: string
    age: number
    sex: string
    relationship: string
  }>
}

interface EnrollmentQuote {
  clinicName: string
  dpcProvider: string
  brokerage: string
  broker: {
    name: string
  }
  employees: Employee[]
}

const mockQuote: EnrollmentQuote = {
  clinicName: "HealthFirst Clinic",
  dpcProvider: "Dr. Jane Smith",
  brokerage: "ABC Insurance",
  broker: {
    name: "John Doe",
  },
  employees: [
    {
      id: "1",
      firstName: "Alice",
      lastName: "Johnson",
      age: 35,
      sex: "Female",
      dependents: [
        {
          id: "d1",
          firstName: "Bob",
          lastName: "Johnson",
          age: 38,
          sex: "Male",
          relationship: "Spouse",
        },
        {
          id: "d2",
          firstName: "Charlie",
          lastName: "Johnson",
          age: 10,
          sex: "Male",
          relationship: "Child",
        },
      ],
    },
    {
      id: "2",
      firstName: "David",
      lastName: "Smith",
      age: 42,
      sex: "Male",
      dependents: [],
    },
  ],
}

export function EnrollmentQuotesView() {
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null)

  const totalEmployees = mockQuote.employees.length
  const totalDependents = mockQuote.employees.reduce((sum, emp) => sum + emp.dependents.length, 0)
  const totalEnrollees = totalEmployees + totalDependents

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF]"></div>
      <CardContent className="p-6 pt-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">{mockQuote.clinicName}</h2>
          <div className="text-gray-600">
            <p>DPC Provider: {mockQuote.dpcProvider}</p>
            <p>Brokerage: {mockQuote.brokerage}</p>
            <p>Broker: {mockQuote.broker.name}</p>
            <p className="mt-2 font-semibold">
              Total Enrollees: {totalEnrollees} ({totalEmployees} employees, {totalDependents} dependents)
            </p>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Sex</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockQuote.employees.map((employee) => (
              <React.Fragment key={employee.id}>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedEmployee(expandedEmployee === employee.id ? null : employee.id)}
                    >
                      {expandedEmployee === employee.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">
                    {employee.firstName} {employee.lastName}
                  </TableCell>
                  <TableCell>{employee.age}</TableCell>
                  <TableCell>{employee.sex}</TableCell>
                </TableRow>
                {expandedEmployee === employee.id &&
                  employee.dependents.map((dependent) => (
                    <TableRow key={dependent.id} className="bg-muted/50">
                      <TableCell></TableCell>
                      <TableCell className="pl-8 font-medium">
                        {dependent.firstName} {dependent.lastName}
                        <span className="ml-2 text-gray-500">({dependent.relationship})</span>
                      </TableCell>
                      <TableCell>{dependent.age}</TableCell>
                      <TableCell>{dependent.sex}</TableCell>
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

