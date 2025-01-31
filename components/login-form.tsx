"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your backend to authenticate the user
    console.log("Login attempted with:", email, password)

    // For demonstration purposes, we'll simulate a successful login
    // In a real application, you would check the user type returned from your backend
    const userType = email.includes("provider") ? "provider" : 
                     email.includes("broker") ? "broker" : "employer"

    // Redirect based on user type
    if (userType === "provider") {
      router.push("/provider/home")
    } else if (userType === "broker") {
      router.push("/broker/home")
    } else {
      router.push("/employer/home")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 rounded-full px-6 text-lg"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-12 rounded-full px-6 text-lg"
        />
      </div>
      <div className="text-left">
        <Link href="/forgot-password" className="text-[#1400FF] hover:underline">
          Forgot password?
        </Link>
      </div>
      <Button 
        type="submit" 
        className="w-full h-12 text-lg rounded-full"
        style={{ backgroundColor: '#1400FF' }}
      >
        Login
      </Button>
      <div className="text-center space-x-1">
        <span className="text-gray-600">New here?</span>
        <Link href="/signup" className="text-[#1400FF] hover:underline">
          Create an account
        </Link>
      </div>
    </form>
  )
}

