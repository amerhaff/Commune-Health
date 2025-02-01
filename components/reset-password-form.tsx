"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    try {
      const response = await fetch('http://localhost:8000/api/accounts/password/reset/confirm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: searchParams.get('token'),
          email: searchParams.get('email'),
          new_password: newPassword,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Failed to connect to server')
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <p className="text-green-600">
          Your password has been successfully reset. Redirecting to login...
        </p>
        <Link href="/login" className="text-[#1400FF] hover:underline">
          Click here if you are not redirected
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        className="h-12 rounded-full px-6 text-lg"
      />
      <Input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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