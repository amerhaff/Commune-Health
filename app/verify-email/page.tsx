"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token')
      if (!token) {
        setStatus('error')
        setMessage('Verification token is missing')
        return
      }

      try {
        const response = await fetch(
          `http://localhost:8000/api/accounts/verify-email/?token=${token}`
        )

        if (response.ok) {
          setStatus('success')
          setMessage('Email verified successfully')
          setTimeout(() => {
            router.push('/login')
          }, 3000)
        } else {
          const data = await response.json()
          setStatus('error')
          setMessage(data.error || 'Verification failed')
        }
      } catch (err) {
        setStatus('error')
        setMessage('Failed to connect to server')
      }
    }

    verifyEmail()
  }, [router, searchParams])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image
            src="/Simpliwell_logo.png"
            alt="Simpliwell"
            width={200}
            height={53}
            className="mx-auto mb-8"
            priority
          />
          <h1 className="text-4xl font-bold tracking-tight">Email Verification</h1>
          <div className="mt-2 text-xl text-gray-600">
            {status === 'loading' && (
              <p>Verifying your email address...</p>
            )}
            {status === 'success' && (
              <div className="space-y-4">
                <p className="text-green-600">{message}</p>
                <p>Redirecting to login...</p>
                <Link href="/login" className="text-[#1400FF] hover:underline">
                  Click here if you are not redirected
                </Link>
              </div>
            )}
            {status === 'error' && (
              <div className="space-y-4">
                <p className="text-red-500">{message}</p>
                <Link href="/login" className="text-[#1400FF] hover:underline">
                  Back to login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 