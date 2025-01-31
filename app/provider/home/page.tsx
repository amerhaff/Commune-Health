"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, MessageSquare, ClipboardList, Settings } from 'lucide-react'
import { cn } from "@/lib/utils"

export default function ProviderHome() {
const unreadMessageCount = 5; // Replace with actual unread message count
const pendingEnrollmentsCount = 3; // Replace with actual pending enrollments count
return (
  <div className="flex flex-col min-h-screen">
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link className="flex items-center space-x-2" href="/provider/home">
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
            <Link href="/provider/settings">
              <Settings className="text-blue-600 mr-2 h-4 w-4" />
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

    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Provider Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="relative pb-0">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-blue-600 h-6 w-6" />
              <h3 className="text-xl font-semibold">Client Roster</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Manage employer clients and employees.</p>
            <Button asChild className="w-full">
              <Link href="/provider/employer-enrollments">
                View
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="relative pb-0">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2 relative">
              <ClipboardList className="text-blue-600 h-6 w-6" />
              {pendingEnrollmentsCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-red-500 rounded-full h-3 w-3 text-xs text-white flex items-center justify-center">
                  {pendingEnrollmentsCount <= 9 ? pendingEnrollmentsCount : "9+"}
                </span>
              )}
              <h3 className="text-xl font-semibold">Enrollment Center</h3>
            </div>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-500">Manage pending enrollments and new requests.</p>
            </div>
            <Button asChild className="w-full">
              <Link href="/provider/pending-enrollments">
                View
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="relative pb-0">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-blue-600 h-6 w-6" />
              <h3 className="text-xl font-semibold">Revenue Overview</h3>
            </div>
            <p className="text-sm text-gray-500 mb-6">View detailed breakdown of your revenue.</p>
            <Button asChild className="w-full">
              <Link href="/provider/revenue">
                View
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="relative pb-0">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#1400FF] rounded-t-md" />
          </CardHeader>
          <CardContent>
          <div className="flex items-center gap-2 mb-2 relative">
            <MessageSquare className="text-blue-600 h-6 w-6" />
            {unreadMessageCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-red-500 rounded-full h-3 w-3 text-xs text-white flex items-center justify-center">
                {unreadMessageCount <= 9 ? unreadMessageCount : "9+"}
              </span>
            )}
            <h3 className="text-xl font-semibold">Messaging</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">Communicate with clients and brokers.</p>
          <Button asChild className="w-full bg-black hover:bg-gray-800">
            <Link href="/provider/messaging">
              Open
            </Link>
          </Button>
        </CardContent>
      </Card>
      </div>
    </main>
  </div>
)
}

