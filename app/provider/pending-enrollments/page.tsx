"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image";
import { Users, Building2, ArrowLeft, ChevronDown, ChevronUp, UserCheck } from 'lucide-react';
import { useProviderContext } from "@/context/ProviderContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

interface Dependent {
id: string;
name: string;
dateOfBirth: string;
relationship: string;
sex: "Male" | "Female" | "Other";
enrolled: boolean;
membershipTier: string;
monthlySubscription: number;
}

interface Employee {
id: string;
name: string;
dateOfBirth: string;
address: string;
email: string;
phoneNumber: string;
sex: "Male" | "Female" | "Other";
enrolled: boolean;
membershipTier: "Basic" | "Standard" | "Premium" | "None";
monthlySubscription: number;
dependents: Dependent[];
}

interface Employer {
id: string;
name: string;
industry: string;
pendingCount: number;
enrolledCount: number;
address: {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};
contactPerson: string;
contactEmail: string;
contactPhone: string;
employees: Employee[];
isExpanded: boolean;
}

export default function PendingEnrollmentsPage() {
const {
  totalEmployers,
  totalEnrolled,
  pendingEnrollments,
  employerEnrollmentsTotalEmployers,
  employerEnrollmentsTotalEnrolled,
  updateMetrics,
} = useProviderContext();

const [employers, setEmployers] = useState<Employer[]>([
  {
    id: "1",
    name: "TechCorp Inc.",
    industry: "Technology",
    pendingCount: 5,
    enrolledCount: 0,
    address: {
      street: "123 Tech St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
    },
    contactPerson: "John Smith",
    contactEmail: "john@techcorp.com",
    contactPhone: "555-0101",
    isExpanded: false,
    employees: [
      {
        id: "1",
        name: "John Doe",
        dateOfBirth: "1985-05-15",
        address: "123 Tech St, San Francisco, CA 94105",
        email: "john@techcorp.com",
        phoneNumber: "555-0101",
        sex: "Male",
        enrolled: false,
        membershipTier: "Standard",
        monthlySubscription: 99,
        dependents: [
          {
            id: "1-1",
            name: "Jane Doe",
            dateOfBirth: "1987-03-20",
            relationship: "Spouse",
            sex: "Female",
            enrolled: false,
            membershipTier: "Standard",
            monthlySubscription: 99,
          },
          {
            id: "1-2",
            name: "Jimmy Doe",
            dateOfBirth: "2010-11-05",
            relationship: "Child",
            sex: "Male",
            enrolled: false,
            membershipTier: "Basic",
            monthlySubscription: 49,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "HealthCare Solutions",
    industry: "Healthcare",
    pendingCount: 3,
    enrolledCount: 0,
    address: {
      street: "456 Health Ave",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
    },
    contactPerson: "Sarah Johnson",
    contactEmail: "sarah@healthcaresolutions.com",
    contactPhone: "555-0202",
    isExpanded: false,
    employees: [
      {
        id: "2",
        name: "Emma Wilson",
        dateOfBirth: "1990-07-22",
        address: "456 Health Ave, Chicago, IL 60601",
        email: "emma@healthcaresolutions.com",
        phoneNumber: "555-0202",
        sex: "Female",
        enrolled: false,
        membershipTier: "Premium",
        monthlySubscription: 149,
        dependents: [],
      },
    ],
  },
]);

useEffect(() => {
  const totalPendingEnrollments = employers.reduce(
    (acc, employer) => acc + employer.pendingCount,
    0
  );
  const initialMetrics = {
    totalEmployers: employers.length,
    totalEnrolled: employers.reduce(
      (acc, employer) => acc + employer.enrolledCount,
      0
    ),
    pendingEnrollments: totalPendingEnrollments,
    employerEnrollmentsTotalEmployers: employers.length,
    employerEnrollmentsTotalEnrolled: employers.reduce(
      (acc, employer) => acc + employer.enrolledCount,
      0
    ),
  };

  updateMetrics(initialMetrics);
}, [employers, updateMetrics]);

const handleEnroll = async (employerId: string, employeeId: string, dependentId?: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/enrollment/requests/${employerId}/process/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        action: 'approve',
        employee_id: employeeId,
        dependent_id: dependentId
      })
    });

    if (response.ok) {
      // Update UI state
      const updatedEmployers = employers.map(employer =>
        employer.id === employerId
          ? {
              ...employer,
              employees: employer.employees.map(emp =>
                emp.id === employeeId
                  ? {
                      ...emp,
                      enrolled: true,
                      dependents: emp.dependents.map(dep =>
                        dep.id === dependentId
                          ? { ...dep, enrolled: true }
                          : dep
                      )
                    }
                  : emp
              ),
              pendingCount: employer.pendingCount - 1,
              enrolledCount: employer.enrolledCount + 1,
            }
          : employer
      );

      setEmployers(updatedEmployers);
      toast({
        title: "Enrollment Successful",
        description: dependentId 
          ? "Dependent has been enrolled successfully"
          : "Employee has been enrolled successfully",
      });
    }
  } catch (error) {
    console.error('Error processing enrollment:', error);
    toast({
      title: "Enrollment Failed",
      description: "Please try again or contact support.",
      variant: "destructive",
    });
  }
};

const handleReject = (employerId: string, employeeId: string, dependentId?: string) => {
  const updatedEmployers = employers.map((employer) =>
    employer.id === employerId
      ? {
          ...employer,
          employees: employer.employees.map((emp) => {
            if (emp.id === employeeId) {
              if (dependentId) {
                // Remove the specific dependent
                return {
                  ...emp,
                  dependents: emp.dependents.filter((dep) => dep.id !== dependentId),
                };
              } else {
                // Remove the entire employee and their dependents
                return null;
              }
            }
            return emp;
          }).filter(Boolean),
          pendingCount: dependentId
            ? employer.pendingCount
            : employer.pendingCount - 1,
        }
      : employer
  );

  const newMetrics = {
    totalEmployers: updatedEmployers.length,
    totalEnrolled: updatedEmployers.reduce(
      (acc, employer) => acc + employer.enrolledCount,
      0
    ),
    pendingEnrollments: updatedEmployers.reduce(
      (acc, employer) => acc + employer.pendingCount,
      0
    ),
    employerEnrollmentsTotalEmployers: updatedEmployers.length,
    employerEnrollmentsTotalEnrolled: updatedEmployers.reduce(
      (acc, employer) => acc + employer.enrolledCount,
      0
    ),
  };

  updateMetrics(newMetrics);
  setEmployers(updatedEmployers);
};

const toggleEmployerExpansion = (employerId: string) => {
  setEmployers(employers.map(employer =>
    employer.id === employerId ? { ...employer, isExpanded: !employer.isExpanded } : employer
  ));
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

    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">Pending Enrollments</h1>
      <Button asChild variant="outline">
        <Link href="/provider/home">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
      </Button>
    </div>

    <Card className="mb-8 relative">
      <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
      <CardHeader>
        <CardTitle className="z-10">Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Building2 className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Total Employers</p>
              <p className="text-xl font-semibold">{totalEmployers}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Total Enrolled</p>
              <p className="text-xl font-semibold">{totalEnrolled}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Pending Enrollments</p>
              <p className="text-xl font-semibold">{pendingEnrollments}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {employers.map((employer) => (
      <div className="relative" key={employer.id}> {/* Added relative div */}
        <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md"></div> {/* Blue strip */}
        <Card className="mb-6">
          <CardHeader
            className="cursor-pointer"
            onClick={() => toggleEmployerExpansion(employer.id)}
          >
            <div className="flex justify-between items-center">
              <CardTitle>{employer.name}</CardTitle>
              <div className="flex items-center">
                <div className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded mr-2">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Pending: {employer.pendingCount}</span>
                </div>
                {employer.isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </div>
          </CardHeader>
          {employer.isExpanded && (
            <CardContent>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Business Details:</p>
                  <p>Industry: {employer.industry}</p>
                  <p>Address: {employer.address.street}, {employer.address.city}, {employer.address.state} {employer.address.zipCode}</p>
                </div>
                <div>
                  <p className="font-semibold">Contact Information:</p>
                  <p>Contact Person: {employer.contactPerson}</p>
                  <p>Email: {employer.contactEmail}</p>
                  <p>Phone: {employer.contactPhone}</p>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date of Birth</TableHead>
                    <TableHead>Sex</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Membership Tier</TableHead>
                    <TableHead>Monthly Subscription ($)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employer.employees.map((employee) => (
                    <React.Fragment key={employee.id}>
                      <TableRow>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.dateOfBirth}</TableCell>
                        <TableCell>{employee.sex}</TableCell>
                        <TableCell>{employee.address}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.phoneNumber}</TableCell>
                        <TableCell>{employee.membershipTier}</TableCell>
                        <TableCell>${employee.monthlySubscription}</TableCell>
                        <TableCell>
                          {employee.enrolled ? (
                            <span className="text-green-600 font-semibold">
                              Enrolled
                            </span>
                          ) : (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleEnroll(employer.id, employee.id)}
                              >
                                Enroll
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                  >
                                    Reject
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently reject the enrollment request for this employee and their dependents.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleReject(employer.id, employee.id)}>
                                      Confirm Rejection
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                      {employee.dependents.map((dependent) => (
                        <TableRow key={dependent.id} className="bg-gray-50">
                          <TableCell className="pl-8">{dependent.name} (Dependent)</TableCell>
                          <TableCell>{dependent.dateOfBirth}</TableCell>
                          <TableCell>{dependent.sex}</TableCell>
                          <TableCell>{employee.address}</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>{dependent.membershipTier}</TableCell>
                          <TableCell>${dependent.monthlySubscription}</TableCell>
                          <TableCell>
                            {dependent.enrolled ? (
                              <span className="text-green-600 font-semibold">
                                Enrolled
                              </span>
                            ) : (
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleEnroll(employer.id, employee.id, dependent.id)}
                                >
                                  Enroll
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                    >
                                      Reject
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently reject the enrollment request for this dependent.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleReject(employer.id, employee.id, dependent.id)}>
                                        Confirm Rejection
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          )}
        </Card>
      </div>
    ))}
  </div>
)
}

