"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Search, ChevronDown, ChevronUp, Users, UserPlus } from 'lucide-react'
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from 'lucide-react';
import cn from 'classnames';
import { toast } from "@/components/ui/use-toast"

// Mock data for demonstration purposes
const accountRequests = {
  broker: [
    {
      id: 1,
      brokerageName: "ABC Insurance Solutions",
      name: "John Doe",
      email: "john@abcinsurance.com",
      phone: "555-123-4567",
      address: "123 Main St, Anytown, USA 12345",
      website: "www.abcinsurance.com",
      npnNumber: "1234567",
      status: "Pending",
    },
    { id: 2, name: "Alice Brown", email: "alice@example.com", brokerageName: "XYZ Benefits", npnNumber: "7654321", status: "Approved" },
  ],
  provider: [
    {
      id: 1,
      practiceName: "HealthFirst Clinic",
      name: "Dr. Jane Smith",
      email: "jane@healthfirst.com",
      phone: "555-111-2222",
      address: "789 Health St, Medville, USA 13579",
      website: "www.healthfirstclinic.com",
      deaNumber: "DEA1234567",
      npiNumber: "NPI9876543210",
      specialty: "Family Medicine",
      education: {
        medicalSchool: "University of Medical Sciences",
        residency: "General Hospital",
        fellowship: "Specialty Institute",
      },
      yearsOfExperience: 10,
      status: "Pending",
    },
    { id: 4, name: "Dr. Bob Johnson", email: "bob@example.com", practiceName: "KidsCare Pediatrics", specialty: "Pediatrics", status: "Rejected" },
  ],
  employer: [
    {
      id: 1,
      businessName: "Tech Innovations Inc.",
      name: "Sarah Tech",
      email: "hr@techinnovations.com",
      phone: "555-555-1212",
      address: "200 Tech Blvd, Silicon Valley, USA 98765",
      website: "www.techinnovations.com",
      ein: "12-3456789",
      industry: "Technology",
      totalEmployees: 150,
      status: "Pending",
    },
    { id: 6, name: "Health Services Inc.", email: "admin@healthservices.com", industry: "Healthcare", employeeCount: 75, status: "Approved" },
  ],
}

const totalAccountRequests = Object.values(accountRequests).reduce((sum, requests) => sum + requests.length, 0);


export default function AccountRequestsPage() {
  const [activeTab, setActiveTab] = useState("broker")
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/accounts/pending-approvals/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        toast({
          title: "Failed to fetch requests",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast({
        title: "Failed to fetch requests",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproval = async (userId: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`http://localhost:8000/api/accounts/approve/${userId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
      });

      if (response.ok) {
        // Refresh the requests list
        fetchRequests();
        toast({
          title: `Account ${action}ed successfully`,
          variant: "success",
        });
      }
    } catch (error) {
      console.error('Error handling approval:', error);
      toast({
        title: "Failed to process request",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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
        <h1 className="text-3xl font-bold">Account Creation Requests ({totalAccountRequests})</h1>
        <Button asChild variant="outline">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div> {/* Blue strip */}
        <CardHeader>
          <CardTitle>Account Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="broker" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="broker" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>Broker</TabsTrigger>
              <TabsTrigger value="provider" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>Provider</TabsTrigger>
              <TabsTrigger value="employer" className={cn("data-[state=active]:bg-black data-[state=active]:text-white")}>Employer</TabsTrigger>
            </TabsList>
            {Object.entries(accountRequests).map(([role, requests]) => (
              <TabsContent key={role} value={role}>
                <div className="flex justify-between items-center mb-4">
                  <Input
                    placeholder={`Search ${role} requests...`}
                    className="max-w-sm"
                  />
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {/* Table headers based on user role */}
                      {role === "broker" && (
                        <>
                          <TableHead>Business Name</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone Number</TableHead>
                          <TableHead>Address</TableHead>
                          <TableHead>Website</TableHead>
                          <TableHead>NPN Number</TableHead>
                        </>
                      )}
                      {role === "provider" && (
                        <>
                          <TableHead>Practice Name</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone Number</TableHead>
                          <TableHead>Address</TableHead>
                          <TableHead>Website</TableHead>
                          <TableHead>DEA #</TableHead>
                          <TableHead>NPI #</TableHead>
                          <TableHead>Specialty</TableHead>
                          <TableHead>Medical School</TableHead>
                          <TableHead>Residency</TableHead>
                          <TableHead>Fellowship</TableHead>
                        </>
                      )}
                      {role === "employer" && (
                        <>
                          <TableHead>Business Name</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone Number</TableHead>
                          <TableHead>Address</TableHead>
                          <TableHead>Website</TableHead>
                          <TableHead>EIN #</TableHead>
                          <TableHead>Industry</TableHead>
                          <TableHead>Total Employees</TableHead>
                        </>
                      )}
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        {/* Table cells based on user role */}
                        {role === "broker" && (
                          <>
                            <TableCell>{request.brokerageName}</TableCell>
                            <TableCell>{request.name}</TableCell>
                            <TableCell>{request.email}</TableCell>
                            <TableCell>{request.phone}</TableCell>
                            <TableCell>{request.address}</TableCell>
                            <TableCell>
                              <a href={`https://${request.website}`} target="_blank" rel="noopener noreferrer">
                                {request.website}
                              </a>
                            </TableCell>
                            <TableCell>{request.npnNumber}</TableCell>
                          </>
                        )}
                        {role === "provider" && (
                          <>
                            <TableCell>{request.practiceName}</TableCell>
                            <TableCell>{request.name}</TableCell>
                            <TableCell>{request.email}</TableCell>
                            <TableCell>{request.phone}</TableCell>
                            <TableCell>{request.address}</TableCell>
                            <TableCell>
                              <a href={`https://${request.website}`} target="_blank" rel="noopener noreferrer">
                                {request.website}
                              </a>
                            </TableCell>
                            <TableCell>{request.deaNumber}</TableCell>
                            <TableCell>{request.npiNumber}</TableCell>
                            <TableCell>{request.specialty}</TableCell>
                            <TableCell>{request.education?.medicalSchool || 'N/A'}</TableCell>
                            <TableCell>{request.education?.residency || 'N/A'}</TableCell>
                            <TableCell>{request.education?.fellowship || 'N/A'}</TableCell>
                          </>
                        )}
                        {role === "employer" && (
                          <>
                            <TableCell>{request.businessName}</TableCell>
                            <TableCell>{request.name}</TableCell>
                            <TableCell>{request.email}</TableCell>
                            <TableCell>{request.phone}</TableCell>
                            <TableCell>{request.address}</TableCell>
                            <TableCell>
                              <a href={`https://${request.website}`} target="_blank" rel="noopener noreferrer">
                                {request.website}
                              </a>
                            </TableCell>
                            <TableCell>{request.ein}</TableCell>
                            <TableCell>{request.industry}</TableCell>
                            <TableCell>{request.totalEmployees}</TableCell>
                          </>
                        )}
                        <TableCell>
                          <Badge
                             variant={request.status === "Pending" ? "outline" : "default"}
                          >
                             {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => handleApproval(request.id, 'approve')}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleApproval(request.id, 'reject')}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

