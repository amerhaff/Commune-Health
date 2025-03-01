"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { CreditCard, Check } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Mock data - in a real application, this would come from the previous page or context
  const enrollmentSummary = {
    providerName: "HealthFirst Clinic",
    totalMonthly: 5000,
    totalYearly: 60000,
    employeeMonthly: 1500,
    employeeYearly: 18000,
    employerMonthly: 3500,
    employerYearly: 42000,
    totalEnrollees: 75,
    enrolledEmployees: 50,
    enrolledDependents: 25,
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsComplete(true)
    toast({
      title: "Enrollment Completed",
      description: "Your payment has been processed and enrollment is complete.",
      duration: 5000,
    })
  }

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Enrollment Complete</h1>
        <p className="text-xl mb-8">Thank you for enrolling with {enrollmentSummary.providerName}.</p>
        <Check className="mx-auto h-16 w-16 text-green-500 mb-8" />
        <Button onClick={() => router.push("/employer/home")}>Return to Dashboard</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="border-b mb-8">
        <div className="container flex h-16 items-center justify-between px-4">
          <Image src="/Simpliwell_logo.png" alt="Simpliwell" width={150} height={40} className="h-10 w-auto" priority />
        </div>
      </header>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Complete Enrollment</h1>
        <Button asChild variant="outline">
          <Link href="/employer/enrollment/provider">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Provider Selection
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="bg-[#1400FF] h-2 w-full"></div>
          <CardHeader>
            <CardTitle>Enrollment Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-[110%]">
            <p className="mb-4">
              <strong>Provider:</strong> {enrollmentSummary.providerName}
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2 text-[100%]">Enrollment Details</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Total Enrollees</p>
                    <p>{enrollmentSummary.totalEnrollees}</p>
                  </div>
                  <div>
                    <p className="font-medium">Enrolled Employees</p>
                    <p>{enrollmentSummary.enrolledEmployees}</p>
                  </div>
                  <div>
                    <p className="font-medium">Enrolled Dependents</p>
                    <p>{enrollmentSummary.enrolledDependents}</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold mb-2 text-[100%]">Cost Details</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Total Cost</p>
                    <p>Monthly: ${enrollmentSummary.totalMonthly}</p>
                    <p>Yearly: ${enrollmentSummary.totalYearly}</p>
                  </div>
                  <div>
                    <p className="font-medium">Employee Cost</p>
                    <p>Monthly: ${enrollmentSummary.employeeMonthly}</p>
                    <p>Yearly: ${enrollmentSummary.employeeYearly}</p>
                  </div>
                  <div>
                    <p className="font-medium">Employer Cost</p>
                    <p>Monthly: ${enrollmentSummary.employerMonthly}</p>
                    <p>Yearly: ${enrollmentSummary.employerYearly}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-[#1400FF] h-2 w-full"></div>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Complete Enrollment"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

