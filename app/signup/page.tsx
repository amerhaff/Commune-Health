"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link";
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ProviderOnboarding } from "@/components/provider-onboarding"
import { BrokerOnboarding } from "@/components/broker-onboarding"
import { EmployerOnboarding } from "@/components/employer-onboarding"
import { useToast } from "@/components/ui/use-toast"

export default function SignupPage() {
  const [accountType, setAccountType] = useState<string>("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const { toast } = useToast()
  const [step, setStep] = useState(1); // Initialize step to 1

  const handleAccountTypeChange = (value: string) => {
    setAccountType(value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setShowPasswordRules(false); // Hide password rules when password changes
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!accountType || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
      setShowPasswordRules(true);
      toast({
        title: "Password doesn't meet requirements",
        variant: "destructive",
      })
      return
    }

    // Proceed to onboarding based on account type
    setStep(2); // Move to the next step (onboarding)
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleOnboardingComplete = () => {
    toast({
      title: "Signup Successful",
      description: "Your account has been created. You can now log in.",
    })
    // Redirect to login page
    window.location.href = '/login'
  }

  if (step === 1) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Image
              src="/Simpliwell_logo.png"
              alt="Simpliwell"
              width={200}
              height={53}
              className="mx-auto mb-4"
              priority
            />
            <h1 className="text-4xl font-bold tracking-tight">Sign Up</h1>
            <p className="mt-2 text-xl text-gray-600">Create a new account</p>
          </div>
          <div className="relative">
            <div className="bg-[#1400FF] absolute inset-0 rounded-lg z-[-1]"></div>
            <div className="bg-white p-8 rounded-lg shadow-md relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Select value={accountType} onValueChange={handleAccountTypeChange}>
                  <SelectTrigger className="rounded-full px-6">
                    <SelectValue placeholder="Select Account Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                    <SelectItem value="broker">Broker</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="h-12 rounded-full px-6 text-lg"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="h-12 rounded-full px-6 text-lg"
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  className="h-12 rounded-full px-6 text-lg"
                />
                {showPasswordRules && (
                  <div className="text-red-500 text-sm">
                    Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                  </div>
                )}
                <Button type="submit" className="w-full h-12 text-lg rounded-full bg-[#1400FF] text-white hover:bg-blue-700">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="text-center space-x-1">
                  <span className="text-gray-600">Already have an account?</span>
                  <Link href="/login" className="text-[#1400FF] hover:underline">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (step === 2) {
    switch (accountType) {
      case "provider":
        return <ProviderOnboarding />
      case "broker":
        return <BrokerOnboarding onBack={handleBack} />
      case "employer":
        return <EmployerOnboarding onSubmit={handleOnboardingComplete} />
      default:
        return null
    }
  }

  return null
}

