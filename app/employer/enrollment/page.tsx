"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Building2, UserCog, ClipboardList } from 'lucide-react'
import { EnrollmentRequestsReview } from "@/components/enrollment-requests-review"
import { EnrollmentsView } from "@/components/enrollments-view"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

export default function EnrollmentOptionsPage() {
const [activeTab, setActiveTab] = useState<"options" | "pending" | "enrollments">("options")
const [requestCount, setRequestCount] = useState(2) // Example count, replace with actual data fetching logic
const [requests, setRequests] = useState([
  {
    id: '1',
    employees: [
      { id: '11', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', selected: false },
      { id: '12', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', selected: true },
    ]
  },
  // ... more requests
])

const toggleEmployeeSelection = (requestId: string, employeeId: string) => {
  setRequests(prevRequests => prevRequests.map(request =>
    request.id === requestId ? {
      ...request,
      employees: request.employees.map(employee =>
        employee.id === employeeId ? { ...employee, selected: !employee.selected } : employee
      )
    } : request
  ));
}

const updateEmployee = (requestId: string, employeeId: string, field: string, value: string) => {
  setRequests(prevRequests => prevRequests.map(request =>
    request.id === requestId ? {
      ...request,
      employees: request.employees.map(employee =>
        employee.id === employeeId ? { ...employee, [field]: value } : employee
      )
    } : request
  ));
}

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
      <h1 className="text-3xl font-bold">Enrollment Center</h1>
      <Button asChild variant="outline">
        <Link href="/employer/home">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
      </Button>
    </div>

    <div className="mb-6">
      <Button
        variant={activeTab === "options" ? "default" : "outline"}
        onClick={() => setActiveTab("options")}
        className="mr-2"
      >
        Enrollment Options
      </Button>
      <Button
        variant={activeTab === "pending" ? "default" : "outline"}
        onClick={() => setActiveTab("pending")}
        className="relative mr-2"
      >
        Pending Enrollments
        {requestCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full h-3 w-3" />
        )}
      </Button>
      <Button
        variant={activeTab === "enrollments" ? "default" : "outline"}
        onClick={() => setActiveTab("enrollments")}
      >
        Current Enrollments
      </Button>
    </div>

    {activeTab === "options" && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="hover:shadow-lg transition-shadow duration-200 relative">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" /> {/* Added blue strip */}
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              <Building2 className="mr-2 h-6 w-6 text-blue-600" />
              Select Providers
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-center text-muted-foreground mb-4">
              Enroll directly with providers for your employees.
            </p>
            <Button className="w-full max-w-xs" size="lg" asChild>
              <Link href="/employer/enrollment/provider">
                Choose Providers
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 relative">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" /> {/* Added blue strip */}
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              <UserCog className="mr-2 h-6 w-6 text-blue-600" />
              Select Broker
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-center text-muted-foreground mb-4">
              Work with a broker to find the best options for your company.
            </p>
            <Button className="w-full max-w-xs" size="lg" asChild>
              <Link href="/employer/enrollment/broker">
                Choose Broker
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )}

    {activeTab === "pending" && (
      <EnrollmentRequestsReview
        className="relative"
        requests={requests}
        setRequests={setRequests}
        handleUpdateRequest={handleUpdateRequest}
        handleCancelRequest={handleCancelRequest}
        requestCount={requestCount} // Pass requestCount to EnrollmentRequestsReview
        setRequestCount={setRequestCount} // Pass setRequestCount to EnrollmentRequestsReview
      />
    )}


    {activeTab === "enrollments" && (
      <EnrollmentsView />
    )}
  </div>
)
}

