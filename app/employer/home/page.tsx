"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Users, Building2, Bell, UserCheck, DollarSign, Settings, ClipboardList, UserCog, Stethoscope, MessageSquare } from 'lucide-react'
import { MessagingInterface } from "@/components/messaging-interface"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Employee {
  name: string
  phone: string
  email: string
  unreadCount: number
}

export default function EmployerHomePage() {
  const [employeeStats, setEmployeeStats] = useState({
    totalEmployees: 1234,
    enrolledEmployees: 1000
  })
  const [totalRevenue, setTotalRevenue] = useState(128450)
  const [unreadMessageCount, setUnreadMessageCount] = useState(5)

  useEffect(() => {
    // Fetch the actual unread message count here and update the state
    // Example: setUnreadMessageCount(fetchUnreadMessageCount())
  }, [])

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
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/employer/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
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
        </div>
      </header>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
          <CardHeader className="relative flex flex-row items-center justify-between pb-2">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardTitle className="text-xl font-semibold flex items-center z-10">
              <Building2 className="mr-2 h-6 w-6 text-blue-600" />
              Employee Management
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span>Total Employees:</span>
                <span className="text-2xl font-bold">{employeeStats.totalEmployees}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span>Enrolled Employees:</span>
                <span className="text-2xl font-bold">{employeeStats.enrolledEmployees}</span>
              </div>
            </div>
            <Button 
              className="w-full mt-4"
              asChild
            >
              <Link href="/employer/employee-roster">
                View
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col justify-between">
          <CardHeader className="relative flex flex-row items-center justify-between pb-2">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardTitle className="text-xl font-semibold flex items-center z-10">
              <ClipboardList className="mr-2 h-6 w-6 text-blue-600" />
              Enrollment Center
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-4 flex-grow">
              Manage employee enrollments, review pending requests, and access enrollment history.
            </p>
            <Button 
              className="w-full mt-auto"
              asChild
            >
              <Link href="/employer/enrollment">
                Open
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
          <CardHeader className="relative flex flex-row items-center justify-between pb-2">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardTitle className="text-xl font-semibold flex items-center z-10">
              <UserCog className="mr-2 h-6 w-6 text-blue-600" />
              Broker Directory
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-4">Access our network of trusted brokers.</p>
            <Button 
              className="w-full mt-4"
              asChild
            >
              <Link href="/employer/broker-directory">
                View
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
          <CardHeader className="relative flex flex-row items-center justify-between pb-2">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardTitle className="text-xl font-semibold flex items-center z-10">
              <Stethoscope className="mr-2 h-6 w-6 text-blue-600" />
              Provider Directory
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-4">Explore our network of healthcare providers.</p>
            <Button 
              className="w-full mt-4"
              asChild
            >
              <Link href="/employer/provider-directory">
                View
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
          <CardHeader className="relative flex flex-row items-center justify-between pb-2">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardTitle className="text-xl font-semibold flex items-center z-10">
              <DollarSign className="mr-2 h-6 w-6 text-blue-600" />
              Total Healthcare Spend
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-4">View detailed breakdown of healthcare costs.</p>
            <Button 
              className="w-full mt-4"
              asChild
            >
              <Link href="/employer/healthcare-spend">
                View
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
          <CardHeader className="relative flex flex-row items-center justify-between pb-2">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardTitle className="text-xl font-semibold flex items-center relative z-10">
              {unreadMessageCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-red-500 rounded-full h-3 w-3 text-xs text-white flex items-center justify-center">
                  {unreadMessageCount <= 9 ? unreadMessageCount : "9+"}
                </span>
              )}
              <MessageSquare className="mr-2 h-6 w-6 text-blue-600" />
              Messaging
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-4">
              Send messages to brokers and providers.
            </p>
            <Button 
              className="w-full"
              asChild
            >
              
              <Link href="/employer/messaging">
                Open
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

