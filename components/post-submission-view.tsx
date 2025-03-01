import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"

interface PostSubmissionViewProps {
  quote: {
    broker: {
      name: string
      company: string
      email: string
      phone?: string
    }
    submittedAt?: string
    status?: string
    recipient?: string
    employees: Array<{
      id: string
      firstName: string
      lastName: string
      email: string
      dependents: Array<{
        id: string
        firstName: string
        lastName: string
        relationship: string
      }>
    }>
  }
}

export function PostSubmissionView({ quote }: PostSubmissionViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Assigned Broker</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <div>{quote.broker.name}</div>
          </div>
          <div>
            <Label>Company</Label>
            <div>{quote.broker.company}</div>
          </div>
          <div>
            <Label>Email</Label>
            <div>{quote.broker.email}</div>
          </div>
          <div>
            <Label>Phone</Label>
            <div>{quote.broker.phone}</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Submission Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Submitted On</Label>
            <div>{new Date(quote.submittedAt).toLocaleDateString()}</div>
          </div>
          <div>
            <Label>Status</Label>
            <div>{quote.status}</div>
          </div>
          <div>
            <Label>Recipient</Label>
            <div>{quote.recipient}</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Employee/Dependent Roster</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Dependents</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quote.employees.map((employee) => (
              <React.Fragment key={employee.id}>
                <TableRow>
                  <TableCell>
                    {employee.firstName} {employee.lastName}
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.dependents.length}</TableCell>
                </TableRow>
                {employee.dependents.map((dependent) => (
                  <TableRow key={dependent.id} className="bg-muted/50">
                    <TableCell className="pl-8">
                      {dependent.firstName} {dependent.lastName}
                    </TableCell>
                    <TableCell>{dependent.relationship}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

