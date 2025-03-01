"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your backend to initiate the password reset process
    console.log("Password reset requested for:", email)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <p className="text-green-600">
          If an account exists for {email}, we have sent password reset instructions to this email address.
        </p>
        <Link href="/login" className="text-[#1400FF] hover:underline">
          Return to login
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-12 rounded-full px-6 text-lg"
      />
      <Button 
        type="submit" 
        className="w-full h-12 text-lg rounded-full"
        style={{ backgroundColor: '#1400FF' }}
      >
        Reset Password
      </Button>
      <div className="text-center">
        <Link href="/login" className="text-[#1400FF] hover:underline">
          Back to login
        </Link>
      </div>
    </form>
  )
}

