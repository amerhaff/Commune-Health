"use client"

// ... (imports and interfaces remain unchanged)

export default function ClientRosterPage() {
  // ... (state and other code remain unchanged)

  const handleUnenrollEmployee = (clientId: string, employeeId: string) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          enrolledEmployees: client.enrolledEmployees - 1,
          employees: client.employees.map(emp => 
            emp.id === employeeId ? { ...emp, status: "Not Enrolled" } : emp
          )
        }
      }
      return client
    })
    setClients(updatedClients)
    toast({
      title: "Employee Unenrolled",
      description: "The employee has been unenrolled from the DPC program.",
    })
  }

  return (
    // ... (other parts of the component remain unchanged)

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center"> {/* Use flexbox for layout */}
            <div className="flex items-center mr-4">
              <Building2 className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Total Clients</p>
                <p className="text-xl font-semibold">{clients.length}</p>
              </div>
            </div>
            <div className="flex items-center"> {/* Total enrollees moved closer */}
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Total Enrollees</p>
                <p className="text-xl font-semibold">{totalEnrollees}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    // ... (rest of the component remains unchanged)
      // ... (other parts of the component remain unchanged)
      {/* ... (Employee Table) ... */}
      <Table>
        {/* ... (Table Header) ... */}
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              {/* ... (other table cells) ... */}
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => {
                        setSelectedClientId(client.id)
                        setSelectedEmployeeId(employee.id)
                      }}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Dependent
                      </Button>
                    </DialogTrigger>
                    {/* ... (DialogContent remains unchanged) ... */}
                  </Dialog>
                  {employee.status === "Enrolled" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="secondary" size="sm">
                          Unenroll
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will unenroll the employee from the DPC program.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleUnenrollEmployee(client.id, employee.id)}>
                            Confirm Unenrollment
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveEmployee(client.id, employee.id)}>
                    <UserMinus className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </TableCell>
              {/* ... (rest of the table cells) ... */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* ... (rest of the component remains unchanged) ... */}
  )
}

