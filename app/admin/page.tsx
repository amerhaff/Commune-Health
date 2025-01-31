"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, UserCog2, Briefcase, Mail } from 'lucide-react'
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"

// Mock data for demonstration - replace with actual data fetching
const accountRequestCounts = {
  broker: 2,
  provider: 5,
  employer: 3,
};

const userCounts = {
  Employer: 10,
  Broker: 5,
  Provider: 15,
};

// Mock unread message count - replace with actual data fetching
const unreadMessageCount = 7;

export default function AdminPage() {
  const totalAccountRequests = Object.values(accountRequestCounts).reduce((acc, count) => acc + count, 0);
  const totalUsers = Object.values(userCounts).reduce((acc, count) => acc + count, 0);

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

      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Account Creation Requests */}
        <Link href="/admin/account-requests">
          <Card className="h-[200px] hover:shadow-lg transition-shadow duration-200 cursor-pointer relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardHeader className="flex flex-row items-start justify-start space-x-2 pb-2">
              <div className="relative">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                {totalAccountRequests > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -left-1 bg-red-500 rounded-full h-4 w-4 text-xs text-white flex items-center justify-center">
                    {totalAccountRequests <= 9 ? totalAccountRequests : "9+"}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl font-semibold flex items-center gap-2 z-10">
                Account Creation Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end p-6">
              <Button className="w-full">View</Button>
            </CardContent>
          </Card>
        </Link>

        {/* User Management */}
        <Link href="/admin/user-management">
          <Card className="h-[200px] hover:shadow-lg transition-shadow duration-200 cursor-pointer relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold flex items-center gap-2 z-10">
              <UserCog2 className="mr-2 h-5 w-5 text-blue-600" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-grow flex flex-col justify-end">
            <Button className="w-full">Open</Button>
          </CardContent>
          </Card>
        </Link>

        {/* Account Management */}
        <Link href="/admin/account-management">
          <Card className="h-[200px] hover:shadow-lg transition-shadow duration-200 cursor-pointer relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold flex items-center gap-2 z-10">
                <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
                Account Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-grow flex flex-col justify-end">
              <Button className="w-full">Open</Button>
            </CardContent>
          </Card>
        </Link>

        {/* Messaging Center */}
        <Link href="/admin/messaging-center">
          <Card className="h-[200px] hover:shadow-lg transition-shadow duration-200 cursor-pointer relative">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold flex items-center gap-2 z-10 relative">
                <Mail className="mr-2 h-5 w-5 text-blue-600" />
                Messaging Center
                {unreadMessageCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -left-1 bg-red-500 rounded-full h-4 w-4 text-xs text-white flex items-center justify-center z-10">
                    {unreadMessageCount <= 9 ? unreadMessageCount : "9+"}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-grow flex flex-col justify-end">
              <Button className="w-full">Open</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

