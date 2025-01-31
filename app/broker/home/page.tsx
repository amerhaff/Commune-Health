"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Users, Building2, Bell, UserCheck, DollarSign, Settings, ClipboardList, MessageSquare, Stethoscope } from 'lucide-react'
import { useBrokerContext } from "@/context/BrokerContext"
import { cn } from "@/lib/utils"

export default function BrokerHomePage() {
  const unreadMessageCount = 5; // Replace with actual unread message count
  const enrollmentRequestCount = 2; // Replace with actual enrollment request count

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
              <Link href="/broker/settings">
                <Settings className="mr-2 h-4 w-4 text-blue-600" />
                Settings
              </Link>
            </Button>
            <Button
              onClick={() => {
                // Here you would typically implement logout functionality
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

      <h1 className="text-3xl font-bold mb-6">Broker Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
        <Link href="/broker/client-enrollments">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full relative">
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
              <CardTitle className="text-xl font-semibold flex items-center z-10">
                <Building2 className="mr-2 text-blue-600" />
                Client Roster
              </CardTitle>
            </CardHeader>
            <CardContent className="h-28">
              <p className="text-sm text-muted-foreground mb-4">View and manage your employer clients and their enrolled employees.</p>
              <Button className="mt-4 w-full">View</Button>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-shadow duration-200 h-full relative">
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardTitle className="text-xl font-semibold flex items-center relative z-10">
              <div className="relative">
                <ClipboardList className="mr-2 text-blue-600" />
                {enrollmentRequestCount > 0 && (
                  <span className="absolute -top-1 -left-1 bg-red-500 rounded-full h-3 w-3 text-xs text-white flex items-center justify-center">
                    {enrollmentRequestCount <= 9 ? enrollmentRequestCount : "9+"}
                  </span>
                )}
              </div>
              DPC Enrollment Center
            </CardTitle>
          </CardHeader>
          <CardContent className="h-32 flex flex-col justify-center">
            <p className="text-sm text-muted-foreground mb-4">
              Manage employee enrollments, review pending requests, and access enrollment history.
            </p>
            <Button 
              className="w-full"
              asChild
            >
              <Link href="/broker/enrollment-center">
                Open </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200 h-full relative">
          <CardHeader className="flex flex-row items-center pb-2 relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardTitle className="text-xl font-semibold flex items-center z-10">
              <Stethoscope className="mr-2 h-6 w-6 text-blue-600" />
              Provider Directory
            </CardTitle>
          </CardHeader>
          <CardContent className="h-32 flex flex-col justify-center">
            <p className="text-sm text-muted-foreground mb-4">
              Access our network of primary care providers.
            </p>
            <Button 
              className="w-full"
              asChild
            >
              <Link href="/broker/provider-directory">
                View
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200 h-full relative">
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardTitle className="text-xl font-semibold flex items-center relative z-10">
              <div className="relative">
                <MessageSquare className="mr-2 text-blue-600" />
                {unreadMessageCount > 0 && (
                  <span className="absolute -top-1 -left-1 bg-red-500 rounded-full h-3 w-3 text-xs text-white flex items-center justify-center">
                    {unreadMessageCount <= 9 ? unreadMessageCount : "9+"}
                  </span>
                )}
              </div>
              Messaging
            </CardTitle>
          </CardHeader>
          <CardContent className="h-32 flex flex-col justify-center">
            <p className="text-sm text-muted-foreground mb-4">
              Communicate with clients and providers.
            </p>
            <Button 
              className="w-full"
              asChild
            >
              <Link href="/broker/messaging">
                Open
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200 relative">
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardTitle className="text-xl font-semibold flex items-center z-10">
              <DollarSign className="mr-2 text-blue-600" />
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="h-32 flex flex-col justify-center">
            <p className="text-sm text-muted-foreground mb-4">
              View detailed breakdown of your revenue and commissions.
            </p>
            <Button 
              className="w-full"
              asChild
            >
              <Link href="/broker/revenue">
                View
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

